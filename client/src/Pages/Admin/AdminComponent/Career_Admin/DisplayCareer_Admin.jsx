import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import { Edit, Trash2, Trash, RotateCcw } from "lucide-react";
import "./../AdminComponents.css";

// 1. Import your PopUp component
import PopUp from "../../../../Components/PopUp/PopUp.jsx";

const API_BASE = import.meta.env.VITE_API_BASE;
const UPLOADS_BASE = "http://localhost:7001";

export default function DisplayCareer_Admin({ onEdit, refreshTrigger }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  // 2. Add State for the Delete Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({
    id: null,
    isPermanent: false,
  });

  const token = getToken();
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = showDeleted
        ? `${API_BASE}/careers/admin?showDeleted=true`
        : `${API_BASE}/careers/admin`;

      const res = await axios.get(url, authConfig);
      setCareers(res.data?.items || []);
    } catch (err) {
      console.error("Fetch error:", err);
      // Proper error handling without alert
      setError("Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [showDeleted, refreshTrigger]);

  const handleRestore = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/careers/admin/${id}/restore`,
        {},
        authConfig
      );
      fetchCareers();
      // Optional: You can use a "Toast" notification here instead of alert
      // For now, we just refresh the table silently or set a temporary success message
    } catch (err) {
      setError("Failed to restore item.");
      setTimeout(() => setError(""), 3000); // Clear error after 3s
    }
  };

  // 3. Step 1: Open the Modal (Don't delete yet)
  const openDeleteModal = (id, isPermanent = false) => {
    setDeleteData({ id, isPermanent });
    setModalOpen(true);
  };

  // 4. Step 2: Actually Delete (Run when user clicks "Confirm" in Modal)
  const confirmDelete = async () => {
    const { id, isPermanent } = deleteData;

    try {
      const url = isPermanent
        ? `${API_BASE}/careers/admin/${id}/hard`
        : `${API_BASE}/careers/admin/${id}`;

      await axios.delete(url, authConfig);

      // Update UI
      setCareers((prev) => prev.filter((item) => item._id !== id));
      setModalOpen(false); // Close modal
    } catch (err) {
      console.error(err);
      setError("Failed to delete item.");
      setModalOpen(false);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="admin-list-section">
      {/* 5. Display Error Message at the top if exists */}
      {error && (
        <div
          className="admin-error animate-fade"
          style={{ marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <div
        className="diplay-item-page-head-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}>
        <h3>Our listed Careers ({careers.length})</h3>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
            className="admin-checkbox"
          />
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "var(--admin-text)",
            }}>
            Show Deleted
          </span>
        </label>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && careers.length === 0 ? (
        <p className="admin-empty-text">No careers found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: "100%" }}>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Date Created</th>
              <th style={{ minWidth: "180px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => {
              if (!showDeleted && career.isDeleted) return null;

              return (
                <tr
                  key={career._id}
                  style={{ opacity: career.isDeleted ? 0.6 : 1 }}>
                  <td>
                    <strong>{career.title}</strong>
                    {career.isDeleted && (
                      <span
                        style={{
                          color: "red",
                          marginLeft: "5px",
                          fontSize: "0.8em",
                        }}>
                        (Deleted)
                      </span>
                    )}
                  </td>
                  <td>
                    {career.image ? (
                      <img
                        src={`${UPLOADS_BASE}${career.image}`}
                        className="admin-thumb"
                        alt=""
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{career.excerpt || "—"}</td>
                  <td>{new Date(career.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="admin-actions-group">
                      {career.isDeleted ? (
                        <>
                          <button
                            onClick={() => handleRestore(career._id)}
                            className="admin-btn admin-btn-secondary admin-btn-sm">
                            <RotateCcw size={14} /> Restore
                          </button>
                          <button
                            // 6. Use openDeleteModal instead of handleDelete
                            onClick={() => openDeleteModal(career._id, true)}
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            style={{
                              backgroundColor: "#dc2626",
                              color: "white",
                            }}>
                            <Trash2 size={14} /> Forever
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => onEdit(career)}
                            className="admin-btn admin-btn-secondary admin-btn-sm">
                            <Edit size={14} /> Edit
                          </button>
                          <button
                            // 6. Use openDeleteModal here too
                            onClick={() => openDeleteModal(career._id, false)}
                            className="admin-btn admin-btn-danger admin-btn-sm">
                            <Trash2 size={14} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* 7. Render the PopUp Component */}
      <PopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title={
          deleteData.isPermanent ? "Confirm Permanent Delete" : "Move to Bin"
        }
        message={
          deleteData.isPermanent
            ? "Are you sure you want to permanently delete this career? This action cannot be undone."
            : "Are you sure you want to move this career to the recycle bin?"
        }
        confirmText={deleteData.isPermanent ? "Delete Forever" : "Delete"}
        cancelText="Cancel"
      />
    </div>
  );
}
