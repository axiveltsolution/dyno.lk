import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import AdminElectricalForm from "./AdminElectricalForm";
import "./AdminPages.css";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminAddElectrical() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [electricals, setElectricals] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchElectricals = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/electricals/admin?page=1&limit=50`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const json = await res.json();
      setElectricals(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElectricals();
  }, []);

  const handleSave = (savedItem) => {
    setIsSubmitting(false);
    fetchElectricals(); // Refresh the list
  };

  const handleCancel = () => {
    navigate("/admin/all-parts");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this electrical accessory?")) return;
    try {
      await fetch(`${API}/electricals/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      fetchElectricals();
    } catch (err) {
      console.error(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="admin-add-electrical-page">
      <div className="admin-page-header">
        <h2>Add Electrical Accessory</h2>
        <p className="admin-page-subtitle">
          Create a new electrical accessory item for your inventory.
        </p>
      </div>

      <div className="admin-form-container">
        <AdminElectricalForm initial={null} onSaved={handleSave} />

        <div className="admin-form-actions">
          <button
            type="button"
            className="admin-btn admin-btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}>
            Cancel
          </button>
        </div>
      </div>

      {/* Electrical Parts List */}
      <div className="admin-electricals-list" style={{ marginTop: "2rem" }}>
        <h3>Existing Electrical Accessories</h3>
        {loading ? (
          <p className="admin-loading">Loading...</p>
        ) : electricals.length === 0 ? (
          <p className="admin-empty">No electrical accessories found.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {electricals.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>{item.category || "—"}</td>
                  <td>{item.type || "—"}</td>
                  <td className="admin-price">
                    {item.price ? `LKR ${item.price}` : "—"}
                  </td>
                  <td>
                    <button
                      className="admin-table-button"
                      onClick={() => handleDelete(item._id)}>
                      Delete
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
