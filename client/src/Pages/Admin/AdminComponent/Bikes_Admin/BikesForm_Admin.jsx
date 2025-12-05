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
      setSuccess("");
    } else {
      setForm({ name: "", image: null });
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
    setError("");

    const data = new FormData();
    data.append("name", form.name.trim());
    if (form.image) data.append("image", form.image);

    try {
      let res;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/spares/admin/bikes/${initial._id}`,
          data,
          config
        );
      } else {
        res = await axios.post(`${API_BASE}/spares/admin/bikes`, data, config);
      }

      onSuccess?.(res.data.bike || res.data);
      setSuccess(isEdit ? "Updated successfully!" : "Added successfully!");

      if (!isEdit) {
        setForm({ name: "", image: null });
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
      <h3>{isEdit ? "Edit Bike" : "Add New Bike"}</h3>

      {success && <p className="admin-success animate-fade">{success}</p>}
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Bike Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Yamaha FZ"
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
