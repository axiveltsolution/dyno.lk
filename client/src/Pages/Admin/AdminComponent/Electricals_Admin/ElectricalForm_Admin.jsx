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
        coverImage: null, // Don't preload file
      });
      setSuccess("");
    } else {
      setForm({
        title: "",
        category: "",
        type: "",
        price: "",
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
    // Append fields only if they have data
    if (form.title) data.append("title", form.title);
    if (form.category) data.append("category", form.category);
    if (form.type) data.append("type", form.type);
    if (form.price) data.append("price", form.price);
    if (form.coverImage) data.append("coverImage", form.coverImage); // Ensure backend expects 'coverImage'

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

      onSuccess?.(res.data.item || res.data);
      setSuccess(isEdit ? "Updated successfully!" : "Added successfully!");

      if (!isEdit) {
        setForm({
          title: "",
          category: "",
          type: "",
          price: "",
          coverImage: null,
        });
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
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
          <label className="admin-label">Title</label>
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
          <label className="admin-label">
            {isEdit ? "Change Image (Optional)" : "Cover Image"}
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
            {loading ? "Saving..." : isEdit ? "Update" : "+ Add"}
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
