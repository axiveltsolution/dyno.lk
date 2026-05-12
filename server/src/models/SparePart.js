// src/models/SparePart.js
import mongoose from "mongoose";
import slugify from "slugify";

const SparePartSchema = new mongoose.Schema({
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
    index: true,
  },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, index: true },
  excerpt: { type: String },
  images: [{ type: String }],
  description: { type: String },
  price: { type: Number },
  type: { type: String, default: "" }, // optional type/category for the part
  category: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

SparePartSchema.pre("validate", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// text index covering title, excerpt, description, category, type
SparePartSchema.index(
  {
    title: "text",
    excerpt: "text",
    description: "text",
    category: "text",
    type: "text",
  },
  { name: "SparePartTextIndex" },
);

SparePartSchema.statics.findActive = function (filter = {}) {
  return this.find({ isDeleted: false, ...filter });
};

export default mongoose.model("SparePart", SparePartSchema);
