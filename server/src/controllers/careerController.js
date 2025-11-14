// src/controllers/careerController.js
import Career from "../models/Career.js";
import { asyncHandler } from "../middleware/async.js";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileIfExists } from "../utils/files.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_URL_PREFIX = "/uploads"; // app serves /uploads

/* ---------- Public ---------- */

// GET /api/careers
export const listCareersPublic = asyncHandler(async (req, res) => {
  const items = await Career.find({ isDeleted: false, isActive: true }).sort({ createdAt: -1 }).select("title slug image");
  res.json({ items });
});

/* ---------- Admin (protected) ---------- */

// GET /api/careers/admin
export const listCareersAdmin = asyncHandler(async (req, res) => {
  const showDeleted = req.query.showDeleted === "true";
  const filter = showDeleted ? {} : { isDeleted: false };
  const items = await Career.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ items });
});

// POST /api/careers/admin
// form-data: title, excerpt (optional), image (file)
export const createCareer = asyncHandler(async (req, res) => {
  const { title, excerpt } = req.body || {};
  if (!title) return res.status(400).json({ error: "title required" });

  let imagePath = null;
  if (req.file) {
    imagePath = path.join(UPLOADS_URL_PREFIX, "careers", req.file.filename).replace(/\\/g, "/");
  }

  const career = new Career({ title, excerpt, image: imagePath });
  await career.save();
  res.status(201).json(career);
});

// PUT /api/careers/admin/:id
// form-data: title?, excerpt?, image (file optional)
export const updateCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, isActive } = req.body || {};

  const item = await Career.findById(id);
  if (!item || item.isDeleted) return res.status(404).json({ error: "Not found" });

  if (title) item.title = title;
  if (excerpt !== undefined) item.excerpt = excerpt;
  if (typeof isActive !== "undefined") item.isActive = isActive;

  if (req.file) {
    // delete old image file if present
    if (item.image) await deleteFileIfExists(item.image);
    item.image = path.join(UPLOADS_URL_PREFIX, "careers", req.file.filename).replace(/\\/g, "/");
  }

  await item.save();
  res.json(item);
});

// DELETE (soft) /api/careers/admin/:id
export const deleteCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Career.findById(id);
  if (!item || item.isDeleted) return res.status(404).json({ error: "Not found" });

  item.isDeleted = true;
  item.isActive = false;
  await item.save();

  // delete image file to free disk
  if (item.image) await deleteFileIfExists(item.image);

  res.json({ ok: true });
});

// POST /api/careers/admin/:id/restore
export const restoreCareer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = await Career.findById(id);
  if (!item || !item.isDeleted) return res.status(404).json({ error: "Not found or not deleted" });

  item.isDeleted = false;
  item.isActive = true;
  await item.save();
  res.json(item);
});
