// src/controllers/spareController.js
import Bike from "../models/Bike.js";
import SparePart from "../models/SparePart.js";
import { asyncHandler } from "../middleware/async.js";
import path from "path";
import { fileURLToPath } from "url";
import { deleteFileIfExists, deleteFilesIfExists } from "../utils/files.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_URL_PREFIX = "/uploads"; // served statically in app.js

function buildTextQuery(q, fields = []) {
  if (!q) return {};
  const safe = q.trim();
  if (!safe) return {};

  // Use $text if supported/desired (note: requires text index)
  // Comment/uncomment depending on preference:
  // return { $text: { $search: safe } };

  // Fallback: regex OR across fields
  const regex = new RegExp(safe.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
  return {
    $or: fields.map(f => ({ [f]: regex }))
  };
}

/* -------------------- Public controllers -------------------- */

// list all bikes (public) -> exclude deleted
export const listBikesPublic = asyncHandler(async (req, res) => {
  const bikes = await Bike.find({ isDeleted: false, isActive: true }).select("name slug image excerpt");
  res.json(bikes);
});

// get a single bike with its spare parts
export const getBikeWithParts = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const bike = await Bike.findOne({ slug, isDeleted: false, isActive: true }).lean();
  if (!bike) return res.status(404).json({ error: "Bike not found" });

  const parts = await SparePart.find({ bike: bike._id, isDeleted: false, isActive: true })
    .select("title slug excerpt images price")
    .lean();

  res.json({ bike, parts });
});

// get a single spare part full details (public)
export const getSparePartPublic = asyncHandler(async (req, res) => {
  const { bikeSlug, partSlug } = req.params;
  const bike = await Bike.findOne({ slug: bikeSlug, isDeleted: false, isActive: true });
  if (!bike) return res.status(404).json({ error: "Bike not found" });

  const part = await SparePart.findOne({ bike: bike._id, slug: partSlug, isDeleted: false, isActive: true }).lean();
  if (!part) return res.status(404).json({ error: "Spare part not found" });

  res.json({ bike: { name: bike.name, slug: bike.slug }, part });
});

/* -------------------- Admin controllers (protected) -------------------- */

// Create a bike (admin)
export const createBike = asyncHandler(async (req, res) => {
  const { name, excerpt } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });

  let imagePath = null;
  if (req.file) {
    imagePath = path.join(UPLOADS_URL_PREFIX, "bikes", req.file.filename).replace(/\\/g, "/");
  }

  const bike = new Bike({ name, excerpt, image: imagePath });
  await bike.save();
  res.status(201).json(bike);
});

// Update bike (admin)
export const updateBike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, excerpt, isActive } = req.body || {};
  const bike = await Bike.findById(id);
  if (!bike || bike.isDeleted) return res.status(404).json({ error: "Not found" });

  if (name) bike.name = name;
  if (excerpt !== undefined) bike.excerpt = excerpt;
  if (typeof isActive === "boolean") bike.isActive = isActive;

  if (req.file) {
    // delete old image file if exists
    if (bike.image) await deleteFileIfExists(bike.image);
    bike.image = path.join(UPLOADS_URL_PREFIX, "bikes", req.file.filename).replace(/\\/g, "/");
  }

  await bike.save();
  res.json(bike);
});

// Soft delete bike (admin) — mark deleted and remove its image files and parts' images
export const deleteBike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findById(id);
  if (!bike || bike.isDeleted) return res.status(404).json({ error: "Not found" });

  // mark bike as deleted
  bike.isDeleted = true;
  bike.isActive = false;
  await bike.save();

  // delete bike main image file
  if (bike.image) {
    await deleteFileIfExists(bike.image);
  }

  // find parts and soft-delete them; also delete part image files
  const parts = await SparePart.find({ bike: bike._id, isDeleted: false });
  for (const p of parts) {
    p.isDeleted = true;
    p.isActive = false;
    await p.save();
    if (p.images && p.images.length) {
      await deleteFilesIfExists(p.images);
    }
  }

  res.json({ ok: true });
});

/* Spare parts admin */

// List parts for a bike (admin) -> show non-deleted by default
export const listPartsForBike = asyncHandler(async (req, res) => {
  const { bikeId } = req.params;
  const bike = await Bike.findById(bikeId);
  if (!bike || bike.isDeleted) return res.status(404).json({ error: "Bike not found" });

  const parts = await SparePart.find({ bike: bike._id, isDeleted: false }).sort({ createdAt: -1 });
  res.json(parts);
});

// Create spare part (admin). multiple files: name 'images'
export const createPart = asyncHandler(async (req, res) => {
  const { bikeId } = req.params;
  const { title, excerpt, description, price } = req.body || {};

  if (!title) return res.status(400).json({ error: "title required" });

  const bike = await Bike.findById(bikeId);
  if (!bike || bike.isDeleted) return res.status(404).json({ error: "Bike not found" });

  const images = (req.files || []).map(f => path.join("/uploads", "parts", f.filename).replace(/\\/g, "/"));

  const part = new SparePart({
    bike: bike._id,
    title,
    excerpt,
    images,
    description,
    price: price ? Number(price) : 0
  });

  await part.save();
  res.status(201).json(part);
});

// Update spare part (admin)
export const updatePart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, description, price, isActive, replaceImages } = req.body || {};
  const part = await SparePart.findById(id);
  if (!part || part.isDeleted) return res.status(404).json({ error: "Not found" });

  if (title) part.title = title;
  if (excerpt !== undefined) part.excerpt = excerpt;
  if (description !== undefined) part.description = description;
  if (price !== undefined) part.price = Number(price);
  if (typeof isActive === "boolean") part.isActive = isActive;

  // if new files uploaded, append or replace
  if (req.files && req.files.length > 0) {
    const newPaths = req.files.map(f => path.join("/uploads", "parts", f.filename).replace(/\\/g, "/"));
    if (replaceImages === "true" || replaceImages === true) {
      // delete old files before replacing
      if (part.images && part.images.length) {
        await deleteFilesIfExists(part.images);
      }
      part.images = newPaths;
    } else {
      part.images = [...(part.images || []), ...newPaths];
    }
  }

  await part.save();
  res.json(part);
});

// Soft delete spare part (admin) and delete its images from disk
export const deletePart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const part = await SparePart.findById(id);
  if (!part || part.isDeleted) return res.status(404).json({ error: "Not found" });

  // mark deleted in DB
  part.isDeleted = true;
  part.isActive = false;
  await part.save();

  // delete images from disk
  if (part.images && part.images.length) {
    await deleteFilesIfExists(part.images);
  }

  res.json({ ok: true });
});

/* Bonus: restore endpoints (admin) */

// Restore a soft-deleted bike (admin)
export const restoreBike = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bike = await Bike.findById(id);
  if (!bike || !bike.isDeleted) return res.status(404).json({ error: "Not found or not deleted" });

  bike.isDeleted = false;
  bike.isActive = true;
  await bike.save();
  res.json(bike);
});

// Restore a soft-deleted part (admin)
export const restorePart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const part = await SparePart.findById(id);
  if (!part || !part.isDeleted) return res.status(404).json({ error: "Not found or not deleted" });

  part.isDeleted = false;
  part.isActive = true;
  await part.save();
  res.json(part);
});


export const searchBikes = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const type = req.query.type || "";
  const category = req.query.category || "";
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;

  const baseFilter = { isDeleted: false, isActive: true };
  if (type) baseFilter.type = type;
  if (category) baseFilter.category = category;

  const textQuery = buildTextQuery(q, ["name", "excerpt", "category", "type"]);
  const filter = Object.keys(textQuery).length ? { $and: [baseFilter, textQuery] } : baseFilter;

  const [total, items] = await Promise.all([
    Bike.countDocuments(filter),
    Bike.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
  ]);

  res.json({ total, page, limit, pages: Math.ceil(total / limit), items });
});

/**
 * GET /api/spares/search/parts?q=&bike=&type=&category=&minPrice=&maxPrice=&page=&limit=
 */
export const searchParts = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const bikeId = req.query.bike || "";           // optional bike id filter
  const type = req.query.type || "";
  const category = req.query.category || "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : null;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : null;
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;

  const baseFilter = { isDeleted: false, isActive: true };
  if (bikeId) baseFilter.bike = bikeId;
  if (type) baseFilter.type = type;
  if (category) baseFilter.category = category;
  if (minPrice !== null || maxPrice !== null) {
    baseFilter.price = {};
    if (minPrice !== null) baseFilter.price.$gte = minPrice;
    if (maxPrice !== null) baseFilter.price.$lte = maxPrice;
  }

  const textQuery = buildTextQuery(q, ["title", "excerpt", "description", "category", "type"]);
  const filter = Object.keys(textQuery).length ? { $and: [baseFilter, textQuery] } : baseFilter;

  const [total, items] = await Promise.all([
    SparePart.countDocuments(filter),
    SparePart.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("bike", "name slug")
      .lean()
  ]);

  res.json({ total, page, limit, pages: Math.ceil(total / limit), items });
});

/**
 * GET /api/spares/autocomplete/bikes?q=&limit=8
 * Returns small list (id, name, slug, image) for typeahead
 */
export const autocompleteBikes = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const limit = Math.min(50, parseInt(req.query.limit || "8", 10));
  if (!q) return res.json([]);
  const textQuery = buildTextQuery(q, ["name", "excerpt", "category", "type"]);
  const filter = { isDeleted: false, isActive: true, ...textQuery };

  const items = await Bike.find(filter).select("name slug image").limit(limit).lean();
  res.json(items);
});

/**
 * GET /api/spares/autocomplete/parts?q=&bike=&limit=8
 */
export const autocompleteParts = asyncHandler(async (req, res) => {
  const q = req.query.q || "";
  const bike = req.query.bike || "";
  const limit = Math.min(50, parseInt(req.query.limit || "8", 10));
  if (!q) return res.json([]);
  const textQuery = buildTextQuery(q, ["title", "excerpt", "description", "category", "type"]);
  const base = { isDeleted: false, isActive: true };
  if (bike) base.bike = bike;
  const filter = { $and: [base, textQuery] };

  const items = await SparePart.find(filter).select("title slug images price").limit(limit).lean();
  res.json(items);
});

/**
 * GET /api/spares/filters/bikes
 * Returns distinct type and category values for bikes (useful to build buttons)
 */
export const getBikeFilters = asyncHandler(async (req, res) => {
  const types = await Bike.distinct("type", { isDeleted: false });
  const categories = await Bike.distinct("category", { isDeleted: false });
  res.json({ types: types.filter(Boolean), categories: categories.filter(Boolean) });
});