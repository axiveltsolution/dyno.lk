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
import { uploadElectricalImages } from "../middleware/upload.js";

const router = Router();

/* ------------------------------------------
   ADMIN ROUTES (must be defined first!)
------------------------------------------- */

const admin = Router();

admin.use(auth, requireAdmin);

admin.get("/", listElectricalAdmin);

admin.post(
  "/",
  uploadElectricalImages.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 12 }
  ]),
  (req, res, next) => {
    req.file = req.files?.cover?.[0] || null;
    req.files = req.files?.images || [];
    return createElectrical(req, res, next);
  }
);

admin.put(
  "/:id",
  uploadElectricalImages.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 12 }
  ]),
  (req, res, next) => {
    req.file = req.files?.cover?.[0] || null;
    req.files = req.files?.images || [];
    return updateElectrical(req, res, next);
  }
);

admin.delete("/:id", deleteElectrical);
admin.post("/:id/restore", restoreElectrical);

router.use("/admin", admin);

/* ------------------------------------------
   PUBLIC ROUTES (define AFTER admin)
------------------------------------------- */

router.get("/", listElectricalsPublic);
router.get("/:slug", getElectricalPublic);

export default router;
