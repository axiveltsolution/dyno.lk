// server/src/controllers/notificationController.js
import { asyncHandler } from "../middleware/async.js";

/**
 * Send order confirmation email
 * POST /api/notifications/send-order-email
 */
export const sendOrderConfirmationEmail = asyncHandler(async (req, res) => {
  const { email, orderNumber, customerName, totalPrice, items } = req.body;

  if (!email || !orderNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Implement with Nodemailer, SendGrid, or similar service
  // Example with Nodemailer:
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASSWORD
  //   }
  // });
  //
  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: `Order Confirmation - ${orderNumber}`,
  //   html: `
  //     <h2>Order Confirmation</h2>
  //     <p>Dear ${customerName},</p>
  //     <p>Your order <strong>${orderNumber}</strong> has been placed successfully!</p>
  //     <p>Total Amount: Rs. ${totalPrice}</p>
  //     <p>Items: ${items.length}</p>
  //     <p>Thank you for shopping with us!</p>
  //   `
  // };
  //
  // await transporter.sendMail(mailOptions);

  console.log(
    `[EMAIL] Order confirmation sent to ${email} for order ${orderNumber}`
  );

  res.json({
    success: true,
    message: "Order confirmation email sent",
    orderNumber,
    email,
  });
});

/**
 * Send order status update email
 * POST /api/notifications/send-status-update-email
 */
export const sendStatusUpdateEmail = asyncHandler(async (req, res) => {
  const { email, customerName, orderNumber, status } = req.body;

  if (!email || !orderNumber || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Implement with Nodemailer, SendGrid, or similar service
  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: `Order Update - ${orderNumber}`,
  //   html: `
  //     <h2>Order Update</h2>
  //     <p>Dear ${customerName},</p>
  //     <p>Your order <strong>${orderNumber}</strong> status has been updated to: <strong>${status}</strong></p>
  //     <p>Thank you!</p>
  //   `
  // };
  //
  // await transporter.sendMail(mailOptions);

  console.log(
    `[EMAIL] Status update sent to ${email} for order ${orderNumber}: ${status}`
  );

  res.json({
    success: true,
    message: "Status update email sent",
    orderNumber,
    status,
  });
});

/**
 * Send order confirmation via WhatsApp
 * POST /api/notifications/send-order-whatsapp
 */
export const sendOrderConfirmationWhatsApp = asyncHandler(async (req, res) => {
  const { phone, orderNumber, customerName, totalPrice } = req.body;

  if (!phone || !orderNumber) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Implement with Twilio WhatsApp API
  // Example with Twilio:
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  //
  // const message = await client.messages.create({
  //   from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
  //   to: `whatsapp:${phone}`,
  //   body: `Order Confirmation\n\nHi ${customerName},\n\nYour order ${orderNumber} has been placed successfully!\n\nTotal: Rs. ${totalPrice}\n\nThank you for shopping with Dyno.lk!`
  // });

  console.log(
    `[WHATSAPP] Order confirmation sent to ${phone} for order ${orderNumber}`
  );

  res.json({
    success: true,
    message: "Order confirmation WhatsApp sent",
    orderNumber,
    phone,
  });
});

/**
 * Send order status update via WhatsApp
 * POST /api/notifications/send-status-update-whatsapp
 */
export const sendStatusUpdateWhatsApp = asyncHandler(async (req, res) => {
  const { phone, customerName, orderNumber, status } = req.body;

  if (!phone || !orderNumber || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // TODO: Implement with Twilio WhatsApp API
  // const message = await client.messages.create({
  //   from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
  //   to: `whatsapp:${phone}`,
  //   body: `Order Update\n\nHi ${customerName},\n\nYour order ${orderNumber} status has been updated to: ${status}\n\nThank you!`
  // });

  console.log(
    `[WHATSAPP] Status update sent to ${phone} for order ${orderNumber}: ${status}`
  );

  res.json({
    success: true,
    message: "Status update WhatsApp sent",
    orderNumber,
    status,
  });
});

/**
 * Send bulk notifications (email + WhatsApp together)
 * POST /api/notifications/send-order-notifications
 */
export const sendOrderNotifications = asyncHandler(async (req, res) => {
  const { email, phone, customerName, orderNumber, totalPrice, items, status } =
    req.body;

  if (!email && !phone) {
    return res.status(400).json({ error: "Email or phone required" });
  }

  const results = {};

  // Send email if provided
  if (email) {
    try {
      console.log(`[EMAIL] Sending order confirmation to ${email}`);
      results.email = { sent: true, message: "Email sent" };
    } catch (err) {
      console.error(`[EMAIL] Failed to send to ${email}:`, err);
      results.email = { sent: false, error: err.message };
    }
  }

  // Send WhatsApp if provided
  if (phone) {
    try {
      console.log(`[WHATSAPP] Sending order confirmation to ${phone}`);
      results.whatsapp = { sent: true, message: "WhatsApp sent" };
    } catch (err) {
      console.error(`[WHATSAPP] Failed to send to ${phone}:`, err);
      results.whatsapp = { sent: false, error: err.message };
    }
  }

  res.json({
    success: true,
    message: "Notifications sent",
    orderNumber,
    results,
  });
});
