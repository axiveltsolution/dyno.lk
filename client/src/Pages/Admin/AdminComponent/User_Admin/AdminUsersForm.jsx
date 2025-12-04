import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminUsersForm({ initial, onSuccess, onCancel }) {
  const token = getToken();

  // 1. Initialize State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isEdit = !!initial;

  // 2. Populate Form on Edit
  useEffect(() => {
    if (initial) {
      setFormData({
        name: initial.name,
        email: initial.email,
        password: "", // Password always empty on edit
        isActive: initial.isActive,
      });
    } else {
      setFormData({ name: "", email: "", password: "", isActive: true });
    }
  }, [initial]);

  // 3. Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let res;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isEdit) {
        res = await axios.put(
          `${API_BASE}/admin/${initial._id}`,
          formData,
          config
        );
      } else {
        if (!formData.password) {
          setError("Password is required for new admins");
          setLoading(false);
          return;
        }
        res = await axios.post(`${API_BASE}/admin`, formData, config);
      }

      onSuccess(res.data); // Notify parent

      // Reset if adding new
      if (!isEdit) {
        setFormData({ name: "", email: "", password: "", isActive: true });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-from-container" style={{ margin: 0 }}>
      <h3>{isEdit ? "Edit Admin" : "Add New Admin"}</h3>
      {error && <p className="admin-error animate-fade">{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g. John Doe"
            required
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="admin@example.com"
            required
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">
            Password {isEdit && "(Optional)"}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required={!isEdit} // Required only for new users
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label
            className="admin-label"
            style={{ display: "flex", gap: "8px", cursor: "pointer" }}>
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="admin-checkbox"
            />
            Active Account
          </label>
        </div>

        <div className="admin-actions-group">
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary">
            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
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
