// src/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  listOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getOrderStats,
} from "../controllers/orderController.js";
import { auth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.post("/", createOrder); // Create order from cart

// Admin routes
router.get("/admin/stats", auth, requireAdmin, getOrderStats); // Get statistics
router.get("/admin", auth, requireAdmin, listOrders); // List all orders
router.get("/:id", auth, requireAdmin, getOrder); // Get single order
router.put("/:id/status", auth, requireAdmin, updateOrderStatus); // Update order status
router.delete("/:id", auth, requireAdmin, deleteOrder); // Cancel order

export default router;
