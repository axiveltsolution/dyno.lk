import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminBikesForm({
  initial = null,
  onSuccess,
  onCancel,
}) {
  const [form, setForm] = useState({ name: "", image: null });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const token = getToken();
  const isEdit = !!initial;

  useEffect(() => {
    if (initial) {
      setForm({ name: initial.name, image: null });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Name is required");

    setLoading(true);
    const data = new FormData();
    data.append("name", form.name.trim());
    if (form.image) data.append("image", form.image);

    try {
      let res;
      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/spares/admin/bikes/${initial._id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        res = await axios.post(`${API_BASE}/spares/admin/bikes`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess?.(res.data.bike || res.data);
      setSuccess(isEdit ? "Updated!" : "Added!");

      if (!isEdit) {
        setForm({ name: "", image: null });
        e.target.reset();
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  return (
    <div className="admin-add-from-container">
      <h2>{isEdit ? "Edit Bike" : "Add New Bike"}</h2>
      {success && <p className="admin-success animate-fade">{success}</p>}
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Bike Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Bike name"
            required
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Bike Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="admin-file-input"
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
