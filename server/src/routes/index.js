// src/routes/index.js
import { Router } from "express";

import authRoutes from "./authRoutes.js";      // your existing auth
import adminRoutes from "./adminRoutes.js";    // your existing admin
import spareRoutes from "./spareRoutes.js";    // new spare parts routes
import contactRoutes from "./contactRoutes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/spares", spareRoutes);
router.use("/contact", contactRoutes);

export default router;
