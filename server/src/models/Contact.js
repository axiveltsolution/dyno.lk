// src/models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false }, // soft-delete
  createdAt: { type: Date, default: Date.now }
});

// helper to find non-deleted
ContactSchema.statics.findActive = function (filter = {}) {
  return this.find({ isDeleted: false, ...filter });
};

export default mongoose.model("Contact", ContactSchema);
