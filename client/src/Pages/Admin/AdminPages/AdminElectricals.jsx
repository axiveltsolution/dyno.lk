import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import AdminElectricalForm from "./AdminElectricalForm";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminElectricals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [editing, setEditing] = useState(null); // item to edit or null
  const [openForm, setOpenForm] = useState(false);

  async function fetchList() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      if (q) params.set("q", q);
      if (showDeleted) params.set("showDeleted", "true");
      const res = await fetch(`${API}/electricals/admin?${params.toString()}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
      });
      const json = await res.json();
      setItems(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchList(); }, [page, q, showDeleted]);

  async function handleDelete(id) {
    if (!confirm("Delete this accessory? (soft-delete)")) return;
    await fetch(`${API}/electricals/admin/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    fetchList();
  }

  async function handleRestore(id) {
    await fetch(`${API}/electricals/admin/${id}/restore`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    fetchList();
  }

  return (
    <div>
      <div className="page-head">
        <h1>Electrical Accessories</h1>
        <p className="muted">Create, edit and manage electrical accessories.</p>
      </div>

      <div className="row" style={{ justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
          <button className="btn" onClick={()=>fetchList()}>Search</button>
          <label style={{display:"inline-flex",alignItems:"center",gap:6}}>
            <input type="checkbox" checked={showDeleted} onChange={e=>setShowDeleted(e.target.checked)} /> show deleted
          </label>
        </div>
        <div>
          <button className="btn" onClick={()=>{ setEditing(null); setOpenForm(true); }}>+ New Accessory</button>
        </div>
      </div>

      {loading ? <div className="loader"><div className="spinner"/></div> : (
        <div className="parts-list admin-list">
          {items.map(it => (
            <div key={it._id} className="card part-card" style={{alignItems:"center"}}>
              <div className="part-media" style={{width:120,height:80}}>
                {it.coverImage ? <img src={`${API}${it.coverImage}`} alt={it.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/> : <div style={{padding:8}}>No image</div>}
              </div>
              <div style={{flex:1, padding:"10px"}}>
                <h3 style={{margin:0}}>{it.title}</h3>
                <div className="muted small">{it.category} • {it.type} • {it.price ? `LKR ${it.price}` : "—"}</div>
                <div className="small muted">Created: {format(new Date(it.createdAt), "yyyy-MM-dd")}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <button className="btn" onClick={()=>{ setEditing(it); setOpenForm(true); }}>Edit</button>
                {!it.isDeleted ? (
                  <button className="btn danger" onClick={()=>handleDelete(it._id)}>Delete</button>
                ) : (
                  <button className="btn" onClick={()=>handleRestore(it._id)}>Restore</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {openForm && (
        <div className="modal">
          <div className="modal-body">
            <button className="modal-close" onClick={()=>setOpenForm(false)}>×</button>
            <AdminElectricalForm
              initial={editing}
              onSaved={()=>{ setOpenForm(false); fetchList(); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
