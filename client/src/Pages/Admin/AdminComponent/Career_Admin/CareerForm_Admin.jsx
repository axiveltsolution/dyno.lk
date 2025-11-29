import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function CareerForm_Admin({ initial, onSuccess, onCancel }) {
  const token = getToken();

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [form, setForm] = useState({
    title: "",
    image: null,
    excerpt: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const isEdit = !!initial;

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        excerpt: initial.excerpt || "",
        image: null,
      });
    } else {
      // Reset logic needed here too
      setForm({ title: "", excerpt: "", image: null });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target; // Standard DOM properties
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");

    setLoading(true);
    setError(""); // Clear old errors

    const data = new FormData();
    data.append("title", form.title.trim());
    data.append("excerpt", form.excerpt || ""); // 5. FIX: Append excerpt
    if (form.image) data.append("image", form.image);

    try {
      let res;
      const config = authConfig;

      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/careers/admin/${initial._id}`,
          data,
          config
        );
      } else {
        res = await axios.post(`${API_BASE}/careers/admin/`, data, config);
      }

      // 6. FIX: Pass correct data back
      onSuccess?.(res.data);
      setSuccess(isEdit ? "Updated!" : "Added!");

      if (!isEdit) {
        setForm({ title: "", excerpt: "", image: null });
        e.target.reset(); // Clears file input visual
      }
    } catch (err) {
      console.error(err);

      // 1. Backend uses { error: "..." }, not { message: "..." }
      // We check err.response.data.error first.
      const backendError = err.response?.data?.error;
      const fallbackError =
        err.response?.data?.message || "Failed to save career";

      setError(backendError || fallbackError);
    } finally {
      setLoading(false);
      // Don't clear the error immediately if it's a validation error (like duplicate title)
      // so the user has time to read it.
      // setTimeout(() => setSuccess(""), 3000); // Only clear Success automatically
    }
  };

  return (
    <div className="admin-add-from-container">
      <h2>{isEdit ? "Edit Career" : "Add New Career"}</h2>
      {success && <p className="admin-success animate-fade">{success}</p>}
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Career Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Career title"
            required
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Career Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="admin-file-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Career Description</label>
          <input
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Career description"
            required
            className="admin-input"
            rows={3}
            disabled={loading}
          />
        </div>

        {/* Replaced inline style with class */}
        <div className="admin-actions-group" style={{ marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary">
            {loading ? "Saving..." : isEdit ? "Update" : "Add"}
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
