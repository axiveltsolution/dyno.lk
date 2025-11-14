// src/routes/electricalRoutes.js
import { Router } from "express";
import {
  listElectricalsPublic,
  getElectricalPublic,
  createElectrical,
  updateElectrical,
  deleteElectrical,
  restoreElectrical,
  listElectricalAdmin
} from "../controllers/electricalController.js";

import { auth, requireAdmin } from "../middleware/auth.js";
// reuse existing upload middleware that stores into uploads/electricals
import { uploadPartImages } from "../middleware/upload.js"; // <-- if you added uploadElectricalImages, prefer that

const router = Router();

/* Public routes */
router.get("/", listElectricalsPublic);                // GET /api/electricals?q=...
router.get("/:slug", getElectricalPublic);             // GET /api/electricals/:slug

/* Admin protected */
const admin = Router();
admin.use(auth, requireAdmin);

// create: accept single cover file named 'cover' and multiple gallery files named 'images'
admin.post("/", /*cover*/ uploadPartImages.fields([{ name: "cover", maxCount: 1 }, { name: "images", maxCount: 12 }]), async (req, res, next) => {
  // multer with .fields results in req.files being an object; normalize for controller:
  // If you want, the controller expects req.file for cover and req.files array for images.
  // Normalize:
  req.file = req.files?.cover?.[0] || null;
  req.files = req.files?.images || [];
  return createElectrical(req, res, next);
});

admin.put("/:id", uploadPartImages.fields([{ name: "cover", maxCount: 1 }, { name: "images", maxCount: 12 }]), async (req, res, next) => {
  req.file = req.files?.cover?.[0] || null;
  req.files = req.files?.images || [];
  return updateElectrical(req, res, next);
});

admin.delete("/:id", deleteElectrical);
admin.post("/:id/restore", restoreElectrical);
admin.get("/", listElectricalAdmin);

router.use("/admin", admin);

export default router;
