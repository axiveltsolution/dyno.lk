// src/admin/electrical/AdminElectricalForm.jsx
import React, { useEffect, useState } from "react";
import TinyEditor from "../../../Components/TinyEditor/TinyEditor";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const UPLOADS_BASE = "http://localhost:7001"; // For previewing images

export default function AdminElectricalForm({ initial = null, onSaved = () => {} }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [category, setCategory] = useState(initial?.category || "");
  const [type, setType] = useState(initial?.type || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [coverFile, setCoverFile] = useState(null);
  const [imagesFiles, setImagesFiles] = useState([]);
  const [replaceImages, setReplaceImages] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Sync form when editing
  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setExcerpt(initial.excerpt || "");
      setPrice(initial.price || "");
      setCategory(initial.category || "");
      setType(initial.type || "");
      setDescription(initial.description || "");
      setReplaceImages(false);
      setCoverFile(null);
      setImagesFiles([]);
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please login again.");
        setSaving(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("excerpt", excerpt.trim());
      formData.append("description", description || "");
      formData.append("price", price || "0");
      formData.append("category", category.trim());
      formData.append("type", type.trim());

      if (replaceImages) formData.append("replaceImages", "true");
      if (coverFile) formData.append("cover", coverFile);
      imagesFiles.forEach((file) => formData.append("images", file));

      const url = initial
        ? `${API_BASE}/electricals/admin/${initial._id}`
        : `${API_BASE}/electricals/admin`;

      const response = await fetch(url, {
        method: initial ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // DO NOT set Content-Type! Let browser set multipart boundary
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || `HTTP ${response.status}`);
      }

      alert(initial ? "Updated successfully!" : "Created successfully!");
      onSaved(result.item || result); // backend returns the saved item

      // Reset form if creating new
      if (!initial) {
        setTitle("");
        setExcerpt("");
        setPrice("");
        setCategory("");
        setType("");
        setDescription("");
        setCoverFile(null);
        setImagesFiles([]);
        setReplaceImages(false);
      }
    } catch (err) {
      console.error("Save failed:", err);
      setError(err.message === "Invalid or expired token" 
        ? "Your session has expired. Please login again."
        : err.message || "Failed to save. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="admin-electrical-form">
      <h3 className="admin-form-title">
        {initial ? "Edit" : "Add New"} Electrical Accessory
      </h3>

      {error && <div className="admin-error-alert">{error}</div>}

      <div className="admin-form-grid">
        <div>
          <label className="admin-label">Title *</label>
          <input
            className="admin-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div>
          <label className="admin-label">Price (LKR)</label>
          <input
            className="admin-input"
            type="number"
            min="0"
            step="100"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            disabled={saving}
          />
        </div>
      </div>

      <div className="admin-form-grid">
        <div>
          <label className="admin-label">Category</label>
          <input
            className="admin-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Lights, Batteries"
            disabled={saving}
          />
        </div>

        <div>
          <label className="admin-label">Type</label>
          <input
            className="admin-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g., LED Headlight, Horn"
            disabled={saving}
          />
        </div>
      </div>

      <div>
        <label className="admin-label">Short Excerpt</label>
        <input
          className="admin-input"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary (optional)"
          disabled={saving}
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="admin-label">
          Cover Image {initial?.coverImage && "(Current)"}
        </label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setCoverFile(e.target.files[0] || null)}
          disabled={saving}
          className="admin-input"
        />
        {initial?.coverImage && !coverFile && (
          <div className="admin-image-preview">
            <img
              src={`${UPLOADS_BASE}${initial.coverImage}`}
              alt="Current cover"
              style={{ width: 120, height: 120, objectFit: "cover", marginTop: 8, borderRadius: 6 }}
            />
          </div>
        )}
        {coverFile && (
          <p style={{ color: "green", fontSize: "0.9rem", marginTop: 4 }}>
            Selected: {coverFile.name}
          </p>
        )}
      </div>

      {/* Gallery Images */}
      <div>
        <label className="admin-label">Gallery Images (up to 12)</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => setImagesFiles(Array.from(e.target.files))}
          disabled={saving}
          className="admin-input"
        />
        {imagesFiles.length > 0 && (
          <p style={{ color: "green", fontSize: "0.9rem", marginTop: 4 }}>
            Selected {imagesFiles.length} image{imagesFiles.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {initial && (
        <label className="admin-label" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={replaceImages}
            onChange={(e) => setReplaceImages(e.target.checked)}
            disabled={saving}
          />
          Replace all existing gallery images
        </label>
      )}

      <div>
        <label className="admin-label">Description</label>
        <TinyEditor
          value={description}
          onChange={setDescription}
          height={400}
          disabled={saving}
        />
      </div>

      <div className="admin-form-actions" style={{ marginTop: 24 }}>
        <button
          type="submit"
          disabled={saving || !title.trim()}
          className="admin-btn admin-btn-primary"
          style={{ minWidth: 140 }}
        >
          {saving ? "Saving..." : initial ? "Update" : "Create"} Accessory
        </button>
      </div>
    </form>
  );
}