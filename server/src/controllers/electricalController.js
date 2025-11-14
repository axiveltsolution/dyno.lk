// src/controllers/electricalController.js
import ElectricalAccessory from "../models/ElectricalAccessory.js";
import { asyncHandler } from "../middleware/async.js";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileIfExists, deleteFilesIfExists } from "../utils/files.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_URL_PREFIX = "/uploads";

/* ---------- Public controllers ---------- */

// List accessories (public, supports optional q search, category, type, pagination)
export const listElectricalsPublic = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const category = req.query.category || "";
  const type = req.query.type || "";
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;

  const baseFilter = { isDeleted: false, isActive: true };
  if (category) baseFilter.category = category;
  if (type) baseFilter.type = type;

  let filter = baseFilter;
  if (q && q.trim()) {
    const safe = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(safe, "i");
    filter = { $and: [baseFilter, { $or: [{ title: regex }, { excerpt: regex }, { description: regex }, { category: regex }, { type: regex }] }] };
  }

  const [total, items] = await Promise.all([
    ElectricalAccessory.countDocuments(filter),
    ElectricalAccessory.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  res.json({ total, page, limit, pages: Math.ceil(total / limit), items });
});

// Get one accessory by slug
export const getElectricalPublic = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const item = await ElectricalAccessory.findOne({ slug, isDeleted: false, isActive: true }).lean();
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json({ item });
});

/* ---------- Admin controllers (protected) ---------- */

// Admin: create accessory (coverImage single, images[] multiple)
export const createElectrical = asyncHandler(async (req, res) => {
  const { title, excerpt, description, price, category, type } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });

  let coverImage = null;
  if (req.file) {
    // expect middleware to store in uploads/electricals/
    coverImage = path.join(UPLOADS_URL_PREFIX, "electricals", req.file.filename).replace(/\\/g, "/");
  }

  const images = (req.files || []).map(f => path.join(UPLOADS_URL_PREFIX, "electricals", f.filename).replace(/\\/g, "/"));

  const accessory = new ElectricalAccessory({
    title,
    excerpt,
    description,
    price: price ? Number(price) : 0,
    category,
    type,
    coverImage,
    images
  });

  await accessory.save();
  res.status(201).json(accessory);
});

// Admin: update accessory (supports replacing cover and images, soft flags)
export const updateElectrical = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, description, price, category, type, isActive, replaceImages } = req.body || {};
  const accessory = await ElectricalAccessory.findById(id);
  if (!accessory || accessory.isDeleted) return res.status(404).json({ error: "Not found" });

  if (title) accessory.title = title;
  if (excerpt !== undefined) accessory.excerpt = excerpt;
  if (description !== undefined) accessory.description = description;
  if (price !== undefined) accessory.price = Number(price);
  if (category !== undefined) accessory.category = category;
  if (type !== undefined) accessory.type = type;
  if (typeof isActive === "boolean") accessory.isActive = isActive;

  // cover image replacement
  if (req.file) {
    if (accessory.coverImage) await deleteFileIfExists(accessory.coverImage);
    accessory.coverImage = path.join(UPLOADS_URL_PREFIX, "electricals", req.file.filename).replace(/\\/g, "/");
  }

  // gallery images
  if (req.files && req.files.length > 0) {
    const newPaths = req.files.map(f => path.join(UPLOADS_URL_PREFIX, "electricals", f.filename).replace(/\\/g, "/"));
    if (replaceImages === "true" || replaceImages === true) {
      // delete old images
      if (accessory.images && accessory.images.length) await deleteFilesIfExists(accessory.images);
      accessory.images = newPaths;
    } else {
      accessory.images = [...(accessory.images || []), ...newPaths];
    }
  }

  await accessory.save();
  res.json(accessory);
});

// Admin: soft delete accessory + delete images from disk
export const deleteElectrical = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const accessory = await ElectricalAccessory.findById(id);
  if (!accessory || accessory.isDeleted) return res.status(404).json({ error: "Not found" });

  accessory.isDeleted = true;
  accessory.isActive = false;
  await accessory.save();

  // delete files
  if (accessory.coverImage) await deleteFileIfExists(accessory.coverImage);
  if (accessory.images && accessory.images.length) await deleteFilesIfExists(accessory.images);

  res.json({ ok: true });
});

// Admin: restore accessory
export const restoreElectrical = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const accessory = await ElectricalAccessory.findById(id);
  if (!accessory || !accessory.isDeleted) return res.status(404).json({ error: "Not found or not deleted" });

  accessory.isDeleted = false;
  accessory.isActive = true;
  await accessory.save();
  res.json(accessory);
});

// Admin: list (paginated) - show deleted optional
export const listElectricalAdmin = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;
  const showDeleted = req.query.showDeleted === "true";

  const filter = showDeleted ? {} : { isDeleted: false };

  const [total, items] = await Promise.all([
    ElectricalAccessory.countDocuments(filter),
    ElectricalAccessory.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()
  ]);

  res.json({ total, page, limit, pages: Math.ceil(total / limit), items });
});
