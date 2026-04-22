import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import PopUp from "../../../../Components/PopUp/PopUp.jsx"; // Import PopUp
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "";
const SERVER_BASE = API_BASE.replace(/\/api$/, "");

export default function AdminDisplayBikes({ bikes, onEdit, onDelete }) {
  const token = getToken();

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Step 1: Request Delete
  const requestDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // Step 2: Confirm Delete
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/spares/admin/bikes/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(deleteId); // Update parent list
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed. Please ensure no parts are linked to this bike.");
      setModalOpen(false);
    }
  };

  return (
    <div>
      <div className="diplay-item-page-head-container">
        <h3>All Bikes ({bikes.length})</h3>
      </div>

      {bikes.length === 0 ? (
        <p className="admin-empty-text">No bikes found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Name</th>
              <th>Image</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
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
                      src={`${SERVER_BASE}${bike.image}`}
                      className="admin-thumb"
                      alt=""
                    />
                  ) : (
                    "—"
                  )}
                </td>
                <td>
                  <div className="admin-actions-group">
                    <button
                      onClick={() => onEdit(bike)}
                      className="admin-btn admin-btn-secondary admin-btn-sm">
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => requestDelete(bike._id)} // Open Modal
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
        title="Delete Bike"
        message="Are you sure you want to delete this bike? This might delete associated parts as well."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
