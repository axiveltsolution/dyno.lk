import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminElectricalForm({ onSuccess, initial, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "",
    price: "",
    excerpt: "", // Added
    description: "", // Added
    coverImage: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token = getToken();
  const isEdit = !!initial;

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        category: initial.category || "",
        type: initial.type || "",
        price: initial.price || "",
        excerpt: initial.excerpt || "", // Populate if editing
        description: initial.description || "", // Populate if editing
        coverImage: null,
      });
      setSuccess("");
    } else {
      setForm({
        title: "",
        category: "",
        type: "",
        price: "",
        excerpt: "",
        description: "",
        coverImage: null,
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");

    setLoading(true);
    setError("");

    const data = new FormData();
    // Append fields
    if (form.title) data.append("title", form.title);
    if (form.category) data.append("category", form.category);
    if (form.type) data.append("type", form.type);
    if (form.price) data.append("price", form.price);
    if (form.excerpt) data.append("excerpt", form.excerpt);
    if (form.description) data.append("description", form.description);

    // FIX: Backend expects field name 'cover', not 'coverImage'
    if (form.coverImage) data.append("cover", form.coverImage);

    try {
      let res;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/electricals/admin/${initial._id}`,
          data,
          config
        );
      } else {
        res = await axios.post(`${API_BASE}/electricals/admin`, data, config);
      }

      // Backend returns the item directly or inside an object, handle both
      const savedItem = res.data.item || res.data;
      onSuccess?.(savedItem);

      setSuccess(isEdit ? "Updated successfully!" : "Added successfully!");

      if (!isEdit) {
        // Reset form
        setForm({
          title: "",
          category: "",
          type: "",
          price: "",
          excerpt: "",
          description: "",
          coverImage: null,
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to save";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-from-container">
      <h3>{isEdit ? "Edit Electrical Item" : "Add Electrical Item"}</h3>

      {success && <p className="admin-success animate-fade">{success}</p>}
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Title *</label>
          <input
            name="title"
            placeholder="e.g. LED Headlight"
            value={form.title}
            onChange={handleChange}
            required
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input
              name="category"
              placeholder="e.g. Lighting"
              value={form.category}
              onChange={handleChange}
              className="admin-input"
              disabled={loading}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Type</label>
            <input
              name="type"
              placeholder="e.g. Accessory"
              value={form.type}
              onChange={handleChange}
              className="admin-input"
              disabled={loading}
            />
          </div>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Price (LKR)</label>
          <input
            name="price"
            type="number"
            placeholder="1500"
            value={form.price}
            onChange={handleChange}
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Short Excerpt</label>
          <textarea
            name="excerpt"
            placeholder="Brief summary for list view..."
            value={form.excerpt}
            onChange={handleChange}
            className="admin-textarea"
            rows="2"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Full Description</label>
          <textarea
            name="description"
            placeholder="Detailed product info (HTML supported if needed)..."
            value={form.description}
            onChange={handleChange}
            className="admin-textarea"
            rows="4"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">
            {isEdit ? "Change Cover Image (Optional)" : "Cover Image"}
          </label>
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            onChange={handleChange}
            className="admin-file-input"
            disabled={loading}
          />
        </div>

        <div className="admin-actions-group">
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary">
            {loading ? "Saving..." : isEdit ? "Update Item" : "+ Add Item"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="admin-btn admin-btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
