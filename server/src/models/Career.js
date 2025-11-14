// src/models/Career.js
import mongoose from "mongoose";
import slugify from "slugify";

const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  image: { type: String }, // path like /uploads/careers/filename.jpg
  excerpt: { type: String }, // optional short text if later needed
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }, // soft-delete
  createdAt: { type: Date, default: Date.now }
});

CareerSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

CareerSchema.statics.findActive = function (filter = {}) {
  return this.find({ isDeleted: false, ...filter });
};

export default mongoose.model("Career", CareerSchema);
