// src/routes/spareRoutes.js
import { Router } from "express";

import {
  // PUBLIC
  listBikesPublic,
  getBikeWithParts,
  getSparePartPublic,
  searchBikes,
  searchParts,
  autocompleteBikes,
  autocompleteParts,
  getBikeFilters,

  // ADMIN
  createBike,
  updateBike,
  deleteBike,
  restoreBike,
  listPartsForBike,
  createPart,
  updatePart,
  deletePart,
  restorePart,
} from "../controllers/spareController.js";

import { auth, requireAdmin } from "../middleware/auth.js";
import { uploadBikeImage, uploadPartImages } from "../middleware/upload.js";

const router = Router();

// 1. List all bikes (for the catalogue grid)
router.get("/bikes", listBikesPublic);

// 2. Get ONE bike + its parts (used by BikePage)
//    → /api/spares/bikes/honda-cbr-150
router.get("/bikes/:slug", getBikeWithParts);

// 3. Get ONE spare part detail (used by PartPage)
//    → /api/spares/bikes/honda-cbr-150/parts/clutch-plate
router.get("/bikes/:bikeSlug/parts/:partSlug", getSparePartPublic);

// 4. Search bikes (with q, type, category, pagination)
router.get("/search/bikes", searchBikes);

// 5. Search parts (optional filters)
router.get("/search/parts", searchParts);

// 6. Autocomplete for search bar
router.get("/autocomplete/bikes", autocompleteBikes);
router.get("/autocomplete/parts", autocompleteParts);

// 7. Get filter options (type & category dropdowns)
router.get("/filters/bikes", getBikeFilters);

const admin = Router();

// Apply auth + admin check to ALL admin routes
admin.use(auth, requireAdmin);

// ── BIKES ───
admin.post("/bikes", uploadBikeImage.single("image"), createBike);
admin.put("/bikes/:id", uploadBikeImage.single("image"), updateBike);
admin.delete("/bikes/:id", deleteBike);
admin.post("/bikes/:id/restore", restoreBike);

// ── PARTS (under a bike) ─────────────────────────────────────
admin.get("/bikes/:bikeId/parts", listPartsForBike);
admin.post(
  "/bikes/:bikeId/parts",
  uploadPartImages.array("images", 8),
  createPart
);
admin.put("/parts/:id", uploadPartImages.array("images", 8), updatePart);
admin.delete("/parts/:id", deletePart);
admin.post("/parts/:id/restore", restorePart);

// Mount admin under /admin
router.use("/admin", admin);

export default router;