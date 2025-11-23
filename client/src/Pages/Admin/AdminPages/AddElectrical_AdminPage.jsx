import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import AdminElectricalForm from "./AdminElectricalForm";
import "./AdminPages.css";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminAddElectrical() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [electricals, setElectricals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchElectricals = async () => {
    if (!token) {
      setError("No auth token found. Please log in as admin.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API}/electricals/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include", // remove if you don't use httpOnly cookies
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          setError("Unauthorized. Please log in as admin.");
          // Optional: navigate("/admin/login");
          return;
        }
        throw new Error(`Server error: ${res.status}`);
      }

      const json = await res.json();
      setElectricals(json.items || json || []);
    } catch (err) {
      console.error("Fetch electricals error:", err);
      setError("Failed to load electrical accessories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectricals();
  }, []);

  const handleSave = () => {
    setIsSubmitting(false);
    fetchElectricals(); // Refresh list after new item is created
  };

  const handleCancel = () => {
    navigate("/admin/all-parts");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this electrical accessory permanently?")) return;

    try {
      const res = await fetch(`${API}/electricals/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to delete (HTTP ${res.status})`);
      }

      // Optimistic update
      setElectricals((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="admin-add-electrical-page">
      <div className="admin-page-header">
        <h2>Add Electrical Accessory</h2>
        <p className="admin-page-subtitle">
          Create a new electrical item. Existing items are listed below.
        </p>
      </div>

      <div className="admin-form-container">
        <AdminElectricalForm
          initial={null}
          onSaved={handleSave}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
        />

        <div className="admin-form-actions" style={{ marginTop: "1rem" }}>
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Back to All Parts
          </button>
        </div>
      </div>

      {/* Existing Items List */}
      <div className="admin-electricals-list" style={{ marginTop: "3rem" }}>
        <h3>Existing Electrical Accessories ({electricals.length})</h3>

        {error && (
          <p className="admin-error" style={{ color: "red", fontWeight: "500" }}>
            {error}
          </p>
        )}

        {loading ? (
          <p className="admin-loading">Loading electrical items...</p>
        ) : electricals.length === 0 ? (
          <p className="admin-empty">
            No electrical accessories yet. Create one using the form above!
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {electricals.map((item) => (
                <tr key={item._id}>
                  <td>
                    <strong>{item.title}</strong>
                  </td>
                  <td>{item.category || "—"}</td>
                  <td>{item.type || "—"}</td>
                  <td className="admin-price">
                    {item.price
                      ? `LKR ${Number(item.price).toLocaleString()}`
                      : "—"}
                  </td>
                  <td>
                    <span
                      className={`admin-badge ${
                        item.isActive
                          ? "admin-badge-success"
                          : "admin-badge-danger"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="admin-btn-danger admin-btn-sm"
                      title="Delete permanently"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}