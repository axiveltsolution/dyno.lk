// server/src/routes/notificationRoutes.js
import express from "express";
import {
  sendOrderConfirmationEmail,
  sendStatusUpdateEmail,
  sendOrderConfirmationWhatsApp,
  sendStatusUpdateWhatsApp,
  sendOrderNotifications,
} from "../controllers/notificationController.js";

const router = express.Router();

/**
 * Email Endpoints
 */
router.post("/send-order-email", sendOrderConfirmationEmail);
router.post("/send-status-update-email", sendStatusUpdateEmail);

/**
 * WhatsApp Endpoints
 */
router.post("/send-order-whatsapp", sendOrderConfirmationWhatsApp);
router.post("/send-status-update-whatsapp", sendStatusUpdateWhatsApp);

/**
 * Bulk Notifications (Email + WhatsApp together)
 */
router.post("/send-order-notifications", sendOrderNotifications);

export default router;
