import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import { getToken } from "../../../../Utils/config.js";
import PopUp from "../../../../Components/PopUp/PopUp.jsx";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function DisplayUsers_Admin({ onEdit, refreshTrigger }) {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token = getToken();

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
    } catch (err) {
      setError("Failed to fetch admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [refreshTrigger]); // Reload when parent says so

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/admin/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prev) => prev.filter((a) => a._id !== deleteId));
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed"); // Ideally replace with in-UI error like Careers page
      setModalOpen(false);
    }
  };

  return (
    <div>
      <h3>All Admins ({admins.length})</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="admin-error">{error}</p>}

      {!loading && (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>
                  <strong>{admin.name}</strong>
                </td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <span
                    style={{
                      color: admin.isActive ? "green" : "red",
                      fontWeight: 600,
                      fontSize: "0.85em",
                    }}>
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="admin-actions-group">
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => onEdit(admin)}>
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => openDeleteModal(admin._id)}>
                      <Trash2 size={14} /> Delete
                    </button>
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
        title="Delete Admin"
        message="Are you sure you want to delete this admin?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
