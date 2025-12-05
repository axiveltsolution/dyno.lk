import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import PopUp from "../../../../Components/PopUp/PopUp.jsx"; // Import PopUp
import "./../AdminComponents.css";

const UPLOADS_BASE = "http://localhost:7001";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminDisplaySpareParts({
  spareParts,
  onEdit,
  onDelete,
}) {
  const token = getToken();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Step 1: Open Modal
  const requestDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Step 2: Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/spares/admin/parts/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Call parent logic to update list
      onDelete(deleteId);
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed"); // Could use a Toast here in future
      setModalOpen(false);
    }
  };

  return (
    <div>
      <div className="diplay-item-page-head-container">
        <h3>All Spare Parts ({spareParts.length})</h3>
      </div>

      {spareParts.length === 0 ? (
        <p className="admin-empty-text">No spare parts found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Title</th>
              <th>Bike</th>
              <th>Price</th>
              <th>Images</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
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
                      onClick={() => requestDelete(p._id)} // Open Modal
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

      {/* PopUp Component */}
      <PopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Spare Part"
        message="Are you sure you want to delete this spare part permanently?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
