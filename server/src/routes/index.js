// src/routes/index.js
import { Router } from "express";

import authRoutes from "./authRoutes.js";
import adminRoutes from "./adminRoutes.js";
import spareRoutes from "./spareRoutes.js";
import contactRoutes from "./contactRoutes.js";
import electricalRoutes from "./electricalRoutes.js";
import careerRoutes from "./careerRoutes.js";
import orderRoutes from "./orderRoutes.js";
import notificationRoutes from "./notificationRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/spares", spareRoutes);
router.use("/contact", contactRoutes);
router.use("/electricals", electricalRoutes);
router.use("/careers", careerRoutes);
router.use("/orders", orderRoutes);
router.use("/notifications", notificationRoutes);

export default router;
