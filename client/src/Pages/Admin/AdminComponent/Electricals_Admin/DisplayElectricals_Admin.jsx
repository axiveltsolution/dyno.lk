import React, { useState } from "react";
import { Trash2, Edit, RotateCcw, ArrowUp, ArrowDown } from "lucide-react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import PopUp from "../../../../Components/PopUp/PopUp.jsx";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const SERVER_BASE = API_BASE.replace(/\/api$/, "");

export default function AdminDisplayElectricals({
  items,
  onDelete,
  onRestore,
  onEdit,
  onReorder,
}) {
  const token = getToken();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Restore Logic
  const handleRestore = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/electricals/admin/${id}/restore`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (onRestore) onRestore();
      alert("Restored successfully!");
    } catch (err) {
      alert("Restore failed");
    }
  };

  // Reorder Logic
  const handleMoveUp = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/electricals/admin/${id}/move-up`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (onReorder) onReorder();
    } catch (err) {
      alert("Move up failed");
    }
  };

  const handleMoveDown = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/electricals/admin/${id}/move-down`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (onReorder) onReorder();
    } catch (err) {
      alert("Move down failed");
    }
  };

  // Delete Logic (Step 1: Open Modal)
  const requestDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Delete Logic (Step 2: Confirm)
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/electricals/admin/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Call parent logic to update list
      onDelete(deleteId);
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed");
      setModalOpen(false);
    }
  };

  return (
    <div>
      <div className="diplay-item-page-head-container">
        <h3>All Electrical Items ({items.length})</h3>
        <p style={{ fontSize: "0.85rem", color: "#999" }}>
          Use ↑/↓ arrow keys to reorder items
        </p>
      </div>

      {items.length === 0 ? (
        <p className="admin-empty-text">No items found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>Order</th>
              <th>Title</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
              <th>Image</th>
              <th style={{ minWidth: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item._id}
                className={item.isDeleted ? "contact-deleted" : ""}
              >
                <td style={{ textAlign: "center", fontWeight: "600" }}>
                  {item.order || 0}
                </td>
                <td>
                  <strong>{item.title}</strong>
                  {item.isDeleted && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "0.8em",
                        marginLeft: "5px",
                      }}
                    >
                      (Deleted)
                    </span>
                  )}
                </td>
                <td>{item.category || "—"}</td>
                <td>{item.type || "—"}</td>
                <td className="admin-price">
                  {item.price ? `LKR ${item.price}` : "—"}
                </td>
                <td>
                  {item.coverImage ? (
                    <img
                      src={`${SERVER_BASE}${item.coverImage}`}
                      alt=""
                      className="admin-thumb"
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  <div className="admin-actions-group">
                    {!item.isDeleted && (
                      <>
                        <button
                          className="admin-btn admin-btn-sm"
                          style={{
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                          }}
                          onClick={() => handleMoveUp(item._id)}
                          title="Move up (↑)"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          className="admin-btn admin-btn-sm"
                          style={{
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                          }}
                          onClick={() => handleMoveDown(item._id)}
                          title="Move down (↓)"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </>
                    )}
                    {item.isDeleted ? (
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => handleRestore(item._id)}
                      >
                        <RotateCcw size={14} /> Restore
                      </button>
                    ) : (
                      <>
                        <button
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          onClick={() => onEdit(item)}
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          onClick={() => requestDelete(item._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <PopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this electrical item?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
