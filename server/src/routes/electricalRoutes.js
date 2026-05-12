import { Router } from "express";
import {
  listElectricalsPublic,
  getElectricalPublic,
  createElectrical,
  updateElectrical,
  deleteElectrical,
  restoreElectrical,
  listElectricalAdmin,
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
    { name: "images", maxCount: 12 },
  ]),
  (req, res, next) => {
    req.file = req.files?.cover?.[0] || null;
    req.files = req.files?.images || [];
    return createElectrical(req, res, next);
  },
);

admin.put(
  "/:id",
  uploadElectricalImages.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 12 },
  ]),
  (req, res, next) => {
    req.file = req.files?.cover?.[0] || null;
    req.files = req.files?.images || [];
    return updateElectrical(req, res, next);
  },
);

admin.delete("/:id", deleteElectrical);
admin.post("/:id/restore", restoreElectrical);
admin.post("/:id/move-up", async (req, res) => {
  try {
    const ElectricalAccessory = (
      await import("../models/ElectricalAccessory.js")
    ).default;
    const item = await ElectricalAccessory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const orderedItems = await ElectricalAccessory.find({ isDeleted: false })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const currentIndex = orderedItems.findIndex(
      (i) => i._id.toString() === item._id.toString(),
    );

    if (currentIndex > 0) {
      const prevItem = await ElectricalAccessory.findById(
        orderedItems[currentIndex - 1]._id,
      );
      if (prevItem) {
        const tempOrder = item.order;
        item.order = prevItem.order;
        prevItem.order = tempOrder;
        await item.save();
        await prevItem.save();
      }
    }

    res.json({ message: "Moved up", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
admin.post("/:id/move-down", async (req, res) => {
  try {
    const ElectricalAccessory = (
      await import("../models/ElectricalAccessory.js")
    ).default;
    const item = await ElectricalAccessory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const orderedItems = await ElectricalAccessory.find({ isDeleted: false })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    const currentIndex = orderedItems.findIndex(
      (i) => i._id.toString() === item._id.toString(),
    );

    if (currentIndex >= 0 && currentIndex < orderedItems.length - 1) {
      const nextItem = await ElectricalAccessory.findById(
        orderedItems[currentIndex + 1]._id,
      );
      if (nextItem) {
        const tempOrder = item.order;
        item.order = nextItem.order;
        nextItem.order = tempOrder;
        await item.save();
        await nextItem.save();
      }
    }

    res.json({ message: "Moved down", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use("/admin", admin);

/* ------------------------------------------
   PUBLIC ROUTES (define AFTER admin)
------------------------------------------- */

router.get("/", listElectricalsPublic);
router.get("/:slug", getElectricalPublic);

export default router;
