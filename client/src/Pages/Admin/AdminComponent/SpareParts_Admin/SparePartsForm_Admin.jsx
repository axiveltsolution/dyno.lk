import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import TinyEditor from "../../../../Components/TinyEditor/TinyEditor.jsx";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminSparePartsForm({
  bikes,
  onSuccess,
  initial,
  onCancel,
}) {
  const [partForm, setPartForm] = useState({
    bikeId: "",
    title: "",
    excerpt: "",
    description: "",
    price: 0,
    images: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = getToken();
  const isEdit = !!initial;

  useEffect(() => {
    if (initial) {
      setPartForm({
        bikeId: initial.bike?._id || initial.bike || "",
        title: initial.title || "",
        excerpt: initial.excerpt || "",
        description: initial.description || "",
        price: initial.price || 0,
        images: [],
      });
      setSuccess(null);
    } else {
      setPartForm({
        bikeId: "",
        title: "",
        excerpt: "",
        description: "",
        price: 0,
        images: [],
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPartForm((prev) => ({
      ...prev,
      [name]: files ? Array.from(files) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partForm.bikeId || !partForm.title.trim()) {
      setError("Bike and title are required");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("title", partForm.title);
    data.append("excerpt", partForm.excerpt || "");
    data.append("description", partForm.description || "");
    data.append("price", partForm.price || 0);

    // Backend likely expects multiple files with key "images"
    partForm.images.forEach((image) => {
      data.append("images", image);
    });

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
          `${API_BASE}/spares/admin/parts/${initial._id}`,
          data,
          config
        );
      } else {
        res = await axios.post(
          `${API_BASE}/spares/admin/bikes/${partForm.bikeId}/parts`,
          data,
          config
        );
      }

      const savedPart = res.data.part || res.data;

      // Construct a display-friendly object to return immediately
      const bike = bikes.find((b) => b._id === partForm.bikeId);
      const fullSavedPart = {
        ...savedPart,
        bike: bike ? { _id: bike._id, name: bike.name } : null,
      };

      if (onSuccess) onSuccess(fullSavedPart);

      setSuccess(isEdit ? "Updated successfully!" : "Added successfully!");

      if (!isEdit) {
        setPartForm({
          bikeId: "",
          title: "",
          excerpt: "",
          description: "",
          price: 0,
          images: [],
        });
        // Clear file input visually
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
      <h3>{isEdit ? "Edit Spare Part" : "Add New Spare Part"}</h3>

      {error && <div className="admin-error animate-fade">{error}</div>}
      {success && <div className="admin-success animate-fade">{success}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Select Bike *</label>
          <select
            name="bikeId"
            value={partForm.bikeId}
            onChange={handleChange}
            className="admin-select"
            required
            disabled={isEdit} // Usually good to lock parent bike on edit
          >
            <option value="">Choose a bike...</option>
            {bikes.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Part Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Brake Pad Set"
            value={partForm.title}
            onChange={handleChange}
            className="admin-input"
            required
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Excerpt (Short description)</label>
          <input
            type="text"
            name="excerpt"
            placeholder="Summary for cards..."
            value={partForm.excerpt}
            onChange={handleChange}
            className="admin-input"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Full Description</label>
          <TinyEditor
            value={partForm.description}
            onChange={(content) =>
              setPartForm((prev) => ({ ...prev, description: content }))
            }
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Price (LKR)</label>
          <input
            type="number"
            name="price"
            placeholder="2500"
            value={partForm.price}
            onChange={handleChange}
            className="admin-input"
            min="0"
            step="0.01"
            disabled={loading}
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">
            {isEdit ? "Add/Replace Images" : "Images (multiple)"}
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="admin-file-input"
            disabled={loading}
          />
          {isEdit && initial.images && initial.images.length > 0 && (
            <small
              className="admin-text-light"
              style={{ display: "block", marginTop: "5px" }}>
              Current images: {initial.images.length} (Upload new to
              replace/add)
            </small>
          )}
        </div>

        <div className="admin-actions-group">
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
