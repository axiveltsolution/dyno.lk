import React, { useEffect, useState } from "react";
import TinyEditor from "../../../Components/TinyEditor/TinyEditor";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminElectricalForm({
  initial = null,
  onSaved = () => {},
}) {
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

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setExcerpt(initial.excerpt || "");
      setPrice(initial.price || "");
      setCategory(initial.category || "");
      setType(initial.type || "");
      setDescription(initial.description || "");
    }
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("excerpt", excerpt);
      fd.append("description", description || "");
      fd.append("price", price || 0);
      fd.append("category", category || "");
      fd.append("type", type || "");
      if (replaceImages) fd.append("replaceImages", "true");
      if (coverFile) fd.append("cover", coverFile);
      imagesFiles.forEach((f) => fd.append("images", f));

      const token = localStorage.getItem("token") || "";
      const opts = {
        method: initial ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      };
      const url = initial
        ? `${API}/electricals/admin/${initial._id}`
        : `${API}/electricals/admin`;
      const res = await fetch(url, opts);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      alert("Saved");
      onSaved(json);
    } catch (err) {
      console.error(err);
      alert(err.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initial ? "Edit" : "Create"} Electrical Accessory</h3>

      <label className="admin-label">Title</label>
      <input
        className="admin-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label className="admin-label">Excerpt</label>
      <input
        className="admin-input"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <label className="admin-label">Price</label>
      <input
        className="admin-input"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <div className="admin-form-row">
        <label className="admin-label">
          Category
          <input
            className="admin-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label className="admin-label">
          Type
          <input
            className="admin-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>
      </div>

      <label className="admin-label">Cover Image (single)</label>
      <input
        className="admin-input"
        type="file"
        accept="image/*"
        onChange={(e) => setCoverFile(e.target.files[0])}
      />

      <label className="admin-label">Gallery Images (multiple)</label>
      <input
        className="admin-input"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => setImagesFiles(Array.from(e.target.files))}
      />

      <label className="admin-label">
        <input
          className="admin-checkbox"
          type="checkbox"
          checked={replaceImages}
          onChange={(e) => setReplaceImages(e.target.checked)}
        />{" "}
        Replace existing images on save
      </label>

      <label className="admin-label">Description (TinyMCE)</label>
      <TinyEditor
        value={description}
        onChange={setDescription}
        height={360}
        placeholder="Write your description..."
      />

      <div className="admin-form-actions">
        <button
          className="admin-btn admin-btn-primary"
          type="submit"
          disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
