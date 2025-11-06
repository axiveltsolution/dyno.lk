// src/routes/spareRoutes.js
import { Router } from "express";
import {
  listBikesPublic,
  getBikeWithParts,
  getSparePartPublic,
  createBike,
  updateBike,
  deleteBike,
  restoreBike,
  listPartsForBike,
  createPart,
  updatePart,
  deletePart,
  restorePart,
  searchBikes,
  searchParts,
  autocompleteBikes,
  autocompleteParts,
  getBikeFilters,
} from "../controllers/spareController.js";

import { auth, requireAdmin } from "../middleware/auth.js";
import { uploadBikeImage, uploadPartImages } from "../middleware/upload.js";

const router = Router();

/* Public routes */
router.get("/bikes", listBikesPublic);
router.get("/bikes/:slug", getBikeWithParts);
router.get("/bikes/:bikeSlug/parts/:partSlug", getSparePartPublic);

/* Admin (protected) */
const admin = Router();
admin.use(auth, requireAdmin);

// Bikes admin
admin.post("/bikes", uploadBikeImage.single("image"), createBike);
admin.put("/bikes/:id", uploadBikeImage.single("image"), updateBike);
admin.delete("/bikes/:id", deleteBike);
admin.post("/bikes/:id/restore", restoreBike); // restore

// Parts admin (under bike)
admin.get("/bikes/:bikeId/parts", listPartsForBike);
admin.post(
  "/bikes/:bikeId/parts",
  uploadPartImages.array("images", 8),
  createPart
);
admin.put("/parts/:id", uploadPartImages.array("images", 8), updatePart);
admin.delete("/parts/:id", deletePart);
admin.post("/parts/:id/restore", restorePart); // restore

router.get("/search/bikes", searchBikes);
router.get("/search/parts", searchParts);

router.get("/autocomplete/bikes", autocompleteBikes);
router.get("/autocomplete/parts", autocompleteParts);

router.get("/filters/bikes", getBikeFilters);

router.use("/admin", admin);

export default router;
