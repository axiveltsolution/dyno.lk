import React, { useEffect, useState } from "react";
import TinyEditor from "../../Components/editor/TinyEditor.jsx";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminElectricalForm({ initial = null, onSaved = ()=>{} }) {
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

  useEffect(()=> {
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
      imagesFiles.forEach(f => fd.append("images", f));

      const token = localStorage.getItem("token") || "";
      const opts = {
        method: initial ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      };
      const url = initial ? `${API}/electricals/admin/${initial._id}` : `${API}/electricals/admin`;
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
    <form onSubmit={handleSubmit} style={{maxWidth:920}}>
      <h2>{initial ? "Edit" : "Create"} Electrical Accessory</h2>

      <label>Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} required />

      <label>Excerpt</label>
      <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} />

      <label>Price</label>
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} />

      <div style={{display:"flex",gap:8}}>
        <label style={{flex:1}}>Category<br/>
          <input value={category} onChange={e=>setCategory(e.target.value)} />
        </label>
        <label style={{flex:1}}>Type<br/>
          <input value={type} onChange={e=>setType(e.target.value)} />
        </label>
      </div>

      <label>Cover Image (single)</label>
      <input type="file" accept="image/*" onChange={e=>setCoverFile(e.target.files[0])} />

      <label>Gallery Images (multiple)</label>
      <input type="file" accept="image/*" multiple onChange={e=>setImagesFiles(Array.from(e.target.files))} />

      <label>
        <input type="checkbox" checked={replaceImages} onChange={e=>setReplaceImages(e.target.checked)} /> Replace existing images on save
      </label>

      <label>Description (TinyMCE)</label>
      <TinyEditor
              value={form.bodyHTML}
              onChange={(html) => setForm((f) => ({ ...f, bodyHTML: html }))}
              height={360}
              placeholder="Write your description..."
    />

      <div style={{marginTop:12, display:"flex", gap:8}}>
        <button className="btn" type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}
