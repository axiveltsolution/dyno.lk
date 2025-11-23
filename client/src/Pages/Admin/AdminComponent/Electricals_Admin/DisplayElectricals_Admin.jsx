// client/src/Pages/Admin/AdminComponent/Electricals_Admin/DisplayElectricals_Admin.jsx
import React from "react";
import { Trash2, Edit } from "lucide-react"; // <--- Import Edit
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";

import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const UPLOADS_BASE = "http://localhost:7001";

export default function AdminDisplayElectricals({
  items,
  onDelete,
  onRestore,
  onEdit, // <--- 1. NEW PROP
}) {
  const token = getToken();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    onDelete(id);
    try {
      await axios.delete(`${API_BASE}/electricals/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      alert("Delete failed");
      window.location.reload();
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/electricals/admin/${id}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onRestore?.();
    } catch (err) {
      alert("Restore failed");
    }
  };

  return (
    <div>
      <h3>All Electrical Items ({items.length})</h3>
      {items.length === 0 ? (
        <p>No items found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className={item.isDeleted ? "contact-deleted" : ""}>
                <td>{item.title}</td>
                <td>{item.category || "—"}</td>
                <td>{item.type || "—"}</td>
                <td className="admin-price">
                  {item.price ? `LKR ${item.price}` : "—"}
                </td>
                <td>
                  {item.coverImage ? (
                    <img
                      src={`${UPLOADS_BASE}${item.coverImage}`}
                      alt=""
                      className="admin-thumb"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  {!item.isDeleted ? (
                    <div className="admin-actions-group">
                      {/* 2. EDIT BUTTON ADDED HERE */}
                      <button
                        className="admin-btn-secondary admin-btn-sm"
                        onClick={() => onEdit(item)}>
                        <Edit size={14} /> Edit
                      </button>

                      <button
                        className="admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(item._id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      className="admin-btn-secondary"
                      onClick={() => handleRestore(item._id)}>
                      Restore
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
