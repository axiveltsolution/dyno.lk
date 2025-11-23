// client/src/Pages/Admin/AdminComponent/Electricals_Admin/ElectricalForm_Admin.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminElectricalForm({
  onSuccess,
  initial, // <--- NEW PROP
  onCancel, // <--- NEW PROP
}) {
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

  // Check if we are editing
  const isEdit = !!initial;

  // 1. POPULATE FORM WHEN EDITING
  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        category: initial.category || "",
        type: initial.type || "",
        price: initial.price || "",
        coverImage: null, // Keep null (don't overwrite unless user picks new file)
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
    setError(""); // Clear previous errors

    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null && form[key] !== "") {
        data.append(key, form[key]);
      }
    });

    try {
      let res;
      // 2. SWITCH BETWEEN POST (ADD) AND PUT (EDIT)
      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/electricals/admin/${initial._id}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await axios.post(`${API_BASE}/electricals/admin`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess?.(res.data.item || res.data);
      setSuccess(
        isEdit ? "Item updated successfully!" : "Item added instantly!"
      );

      // Reset form only if NOT editing
      if (!isEdit) {
        setForm({
          title: "",
          category: "",
          type: "",
          price: "",
          coverImage: null,
        });
        e.target.reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save item");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Electrical Item" : "Add Electrical Item"}</h2>

      {success && <p className="admin-success animate-fade">{success}</p>}
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="title"
          placeholder="Title"
          value={form.title} // Ensure value is controlled
          onChange={handleChange}
          required
          className="admin-input"
          disabled={loading}
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="admin-input"
          disabled={loading}
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          className="admin-input"
          disabled={loading}
        />
        <input
          name="price"
          type="number"
          placeholder="Price (LKR)"
          value={form.price}
          onChange={handleChange}
          className="admin-input"
          disabled={loading}
        />
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

        <div className="admin-actions" style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary">
            {loading ? "Saving..." : isEdit ? "Update Item" : "Add Item"}
          </button>

          {/* 3. CANCEL BUTTON */}
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
