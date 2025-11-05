// src/controllers/adminController.js
import AdminUser from "../models/AdminUser.js";
import { asyncHandler } from "../middleware/async.js";

// List all admins
export const listAdmins = asyncHandler(async (_req, res) => {
  const users = await AdminUser.find({}).select("-passwordHash");
  res.json(users);
});

// Create admin
export const createAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email, password required" });
  }
  const exists = await AdminUser.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: "Email already in use" });
  }
  const user = new AdminUser({ name, email, role: "admin" });
  await user.setPassword(password);
  await user.save();
  res.status(201).json({ id: user._id, name: user.name, email: user.email, role: "admin" });
});

// Update admin (name/email/isActive; password optional)
export const updateAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, isActive } = req.body || {};
  const user = await AdminUser.findById(id);
  if (!user) return res.status(404).json({ error: "Not found" });

  if (email && email !== user.email) {
    const emailInUse = await AdminUser.findOne({ email, _id: { $ne: id } });
    if (emailInUse) return res.status(409).json({ error: "Email already in use" });
    user.email = email;
  }
  if (name !== undefined) user.name = name;
  if (typeof isActive === "boolean") user.isActive = isActive;
  if (password) await user.setPassword(password);

  await user.save();
  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: "admin",
    isActive: user.isActive
  });
});

// PERMANENT delete admin 
export const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Safety: prevent deleting your own DB account
  if (req.user?.id && req.user.id === id) {
    return res.status(400).json({ error: "You cannot delete your own account" });
  }

  const deleted = await AdminUser.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });

  res.json({ ok: true });
});
