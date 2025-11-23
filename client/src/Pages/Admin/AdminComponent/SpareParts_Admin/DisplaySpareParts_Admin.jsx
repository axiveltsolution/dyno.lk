import React from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

import "./../AdminComponents.css";

const UPLOADS_BASE = "http://localhost:7001";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminDisplaySpareParts({
  spareParts,
  onEdit,
  onDelete,
}) {
  const token = getToken();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this spare part permanently?")) return;

    onDelete(id);
    try {
      await axios.delete(`${API_BASE}/spares/admin/parts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      alert("Delete failed");
      window.location.reload();
    }
  };

  return (
    <div>
      <h3>All Spare Parts ({spareParts.length})</h3>
      {spareParts.length === 0 ? (
        <p className="admin-empty-text">No spare parts found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Bike</th>
              <th>Price</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((p) => (
              <tr key={p._id}>
                <td>
                  <strong>{p.title}</strong>
                </td>
                <td>{p.bike?.name || "—"}</td>
                <td className="admin-price">
                  LKR {Number(p.price || 0).toFixed(2)}
                </td>
                <td>
                  <span className="admin-image-count">
                    {p.images?.length || 0}
                  </span>
                </td>
                <td>
                  <div className="admin-actions-group">
                    <button
                      onClick={() => onEdit(p)}
                      className="admin-btn admin-btn-secondary admin-btn-sm">
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="admin-btn admin-btn-danger admin-btn-sm">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
