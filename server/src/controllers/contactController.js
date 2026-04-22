// src/controllers/contactController.js
import Contact from "../models/Contact.js";
import { asyncHandler } from "../middleware/async.js";
import { mailer } from "../utils/email/mailer.js";

/**
 * Public: create a contact message
 * POST /api/contact
 * Body: { name, email, phone?, message }
 */
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "name, email and message are required" });
  }

  const c = new Contact({ name, email, phone, message });
  await c.save();

  // Send an email notification to admin (best-effort, non-blocking)
  try {
    await mailer.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Message from ${c.name}`,
      html: `
        <h3>New contact message received</h3>
        <p><strong>Name:</strong> ${c.name}</p>
        <p><strong>Email:</strong> ${c.email}</p>
        <p><strong>Phone:</strong> ${c.phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${(c.message || "").replace(/\n/g, "<br/>")}</p>
        <p>Received: ${new Date(c.createdAt).toLocaleString("en-US", { timeZone: "Asia/Colombo" })}</p>
      `,
    });
  } catch (err) {
    console.error(
      "[CONTACT EMAIL] Failed to send admin notification:",
      err.message,
    );
  }

  res.status(201).json({ success: true, id: c._id });
});

/**
 * Admin: list contact messages (paginated)
 * GET /api/contact/admin
 * Query: page, limit, showDeleted (optional)
 */
export const listContacts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || "1", 10));
  const limit = Math.min(100, parseInt(req.query.limit || "20", 10));
  const skip = (page - 1) * limit;

  const showDeleted = req.query.showDeleted === "true";

  const filter = showDeleted ? {} : { isDeleted: false };

  const [total, items] = await Promise.all([
    Contact.countDocuments(filter),
    Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
  ]);

  res.json({
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    items,
  });
});

/**
 * Admin: get single contact
 * GET /api/contact/admin/:id
 */
export const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id).lean();
  if (!contact || contact.isDeleted)
    return res.status(404).json({ error: "Not found" });
  res.json(contact);
});

/**
 * Admin: mark as read/unread
 * PATCH /api/contact/admin/:id/read
 * Body: { isRead: true|false } (defaults to true)
 */
export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isRead = true } = req.body || {};
  const contact = await Contact.findById(id);
  if (!contact || contact.isDeleted)
    return res.status(404).json({ error: "Not found" });
  contact.isRead = !!isRead;
  await contact.save();
  res.json({ ok: true, isRead: contact.isRead });
});

/**
 * Admin: soft-delete a contact
 * DELETE /api/contact/admin/:id
 */
export const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact || contact.isDeleted)
    return res.status(404).json({ error: "Not found" });

  contact.isDeleted = true;
  await contact.save();
  res.json({ ok: true });
});

/**
 * Admin: restore a soft-deleted contact
 * POST /api/contact/admin/:id/restore
 */
export const restoreContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact || !contact.isDeleted)
    return res.status(404).json({ error: "Not found or not deleted" });

  contact.isDeleted = false;
  await contact.save();
  res.json({ ok: true });
});
