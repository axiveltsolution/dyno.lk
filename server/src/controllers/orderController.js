// src/controllers/orderController.js
import Order from "../models/Order.js";
import { asyncHandler } from "../middleware/async.js";
import { handleNewOrderNotifications } from "./notificationController.js";


// Helper function to send notifications
const sendNotifications = async (order) => {
  const API_BASE = process.env.API_BASE || "http://localhost:7001/api";

  try {
    // Send email and WhatsApp notifications
    await fetch(`${API_BASE}/notifications/send-order-notifications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: order.customer.email,
        phone: order.customer.phone,
        customerName: order.customer.name,
        orderNumber: order.orderNumber,
        totalPrice: order.totalPrice,
        items: order.items,
        status: order.status,
      }),
    }).catch((err) => console.error("[NOTIFICATIONS] Error:", err.message));
  } catch (err) {
    console.error("[NOTIFICATIONS] Failed to send:", err.message);
    // Don't throw - order was already saved, notifications are secondary
  }
};

// Create a new order (public - no auth needed)
export const createOrder = asyncHandler(async (req, res) => {
  const { customer, items, totalPrice } = req.body || {};

  if (!customer || !items || items.length === 0 || !totalPrice) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (
    !customer.name ||
    !customer.email ||
    !customer.phone ||
    !customer.address
  ) {
    return res.status(400).json({ error: "Missing customer details" });
  }

  const order = new Order({
    customer,
    items,
    totalPrice,
    status: "pending",
  });

  await order.save();

  // Send notifications in background (non-blocking)
  handleNewOrderNotifications(order);


  res.status(201).json({
    message: "Order placed successfully",
    orderNumber: order.orderNumber,
    order,
  });
});

// Get all orders (admin only - requires auth)
export const listOrders = asyncHandler(async (req, res) => {
  // Middleware should enforce admin, verify in middleware
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;
  const status = req.query.status || "";

  const filter = status ? { status } : {};

  const [total, orders] = await Promise.all([
    Order.countDocuments(filter),
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  ]);

  res.json({
    orders,
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
  });
});

// Get single order by ID
export const getOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json({ order });
});

// Update order status (admin only)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (
    !status ||
    !["pending", "confirmed", "shipped", "delivered", "cancelled"].includes(
      status
    )
  ) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const order = await Order.findByIdAndUpdate(
    id,
    { status, updatedAt: Date.now() },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  // Send status update notifications in background
  const API_BASE = process.env.API_BASE || "http://localhost:7001/api";
  fetch(`${API_BASE}/notifications/send-status-update-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: order.customer.email,
      customerName: order.customer.name,
      orderNumber: order.orderNumber,
      status,
    }),
  }).catch((err) => console.error("[NOTIFICATIONS] Error:", err.message));

  fetch(`${API_BASE}/notifications/send-status-update-whatsapp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: order.customer.phone,
      customerName: order.customer.name,
      orderNumber: order.orderNumber,
      status,
    }),
  }).catch((err) => console.error("[NOTIFICATIONS] Error:", err.message));

  res.json({ message: "Order status updated", order });
});

// Delete order (soft delete)
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(
    id,
    { status: "cancelled", updatedAt: Date.now() },
    { new: true }
  );

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json({ message: "Order cancelled", order });
});

// Get order statistics (admin only)
export const getOrderStats = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const pendingOrders = await Order.countDocuments({ status: "pending" });
  const confirmedOrders = await Order.countDocuments({ status: "confirmed" });
  const shippedOrders = await Order.countDocuments({ status: "shipped" });
  const deliveredOrders = await Order.countDocuments({ status: "delivered" });

  const totalRevenue = await Order.aggregate([
    {
      $match: { status: { $in: ["confirmed", "shipped", "delivered"] } },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalPrice" },
      },
    },
  ]);

  res.json({
    totalOrders,
    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
  });
});
