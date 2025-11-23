import React from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

// IMPORT THE SHARED CSS
import "./../AdminComponents.css";

const UPLOADS_BASE = "http://localhost:7001";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminDisplayBikes({ bikes, onEdit, onDelete }) {
  const token = getToken();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete bike + all parts?")) return;
    onDelete(id);
    try {
      await axios.delete(`${API_BASE}/spares/admin/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  };

  return (
    <div>
      <h3>All Bikes ({bikes.length})</h3>
      {bikes.length === 0 ? (
        <p className="admin-empty-text">No bikes found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike) => (
              <tr key={bike._id}>
                <td>
                  <strong>{bike.name}</strong>
                </td>
                <td>
                  {bike.image ? (
                    <img
                      src={`${UPLOADS_BASE}${bike.image}`}
                      className="admin-thumb"
                      alt=""
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {/* Utilized the admin-actions-group class */}
                  <div className="admin-actions-group">
                    <button
                      onClick={() => onEdit(bike)}
                      className="admin-btn admin-btn-secondary admin-btn-sm">
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(bike._id)}
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
