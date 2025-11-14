// src/models/ElectricalAccessory.js
import mongoose from "mongoose";
import slugify from "slugify";

const ElectricalAccessorySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, index: true },
  coverImage: { type: String },           // single cover image path (string)
  images: [{ type: String }],             // gallery images paths
  excerpt: { type: String },
  description: { type: String },          // TinyMCE HTML
  price: { type: Number, default: 0 },
  category: { type: String, default: "" },
  type: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// auto-generate slug
ElectricalAccessorySchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// text index for search
ElectricalAccessorySchema.index({
  title: "text",
  excerpt: "text",
  description: "text",
  category: "text",
  type: "text"
}, { name: "ElectricalAccessoryTextIndex" });

ElectricalAccessorySchema.statics.findActive = function (filter = {}) {
  return this.find({ isDeleted: false, ...filter });
};

export default mongoose.model("ElectricalAccessory", ElectricalAccessorySchema);
