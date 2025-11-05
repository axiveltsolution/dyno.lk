// src/models/Bike.js
import mongoose from "mongoose";
import slugify from "slugify";

const BikeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true },
  image: { type: String },
  excerpt: { type: String },
  type: { type: String, default: "" },      // e.g. "bike" or "scooter" or custom
  category: { type: String, default: "" },  // e.g. "commuter", "sport", "offroad"
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

BikeSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// text index covering name, excerpt, category, type
BikeSchema.index({
  name: "text",
  excerpt: "text",
  category: "text",
  type: "text"
}, { name: "BikeTextIndex" });

BikeSchema.statics.findActive = function (filter = {}) {
  return this.find({ isDeleted: false, ...filter });
};

export default mongoose.model("Bike", BikeSchema);
