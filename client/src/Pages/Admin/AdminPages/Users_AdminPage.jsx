import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, Edit, Trash2, Plus } from "lucide-react";
import "./AdminPages.css";
// IMPORT SHARED COMPONENT STYLES
import "../AdminComponent/AdminComponents.css";
import { getToken } from "../../../Utils/config.js";
import PopUp from "../../../Components/PopUp/PopUp.jsx";

const API_BASE = import.meta.env.VITE_API_BASE;

const Users_AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const token = getToken();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch admins");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (selectedAdmin) {
        res = await axios.put(
          `${API_BASE}/admin/${selectedAdmin._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        if (!formData.password) {
          setError("Password is required for new admins");
          return;
        }
        res = await axios.post(`${API_BASE}/admin`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchAdmins();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/admin/${selectedDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
      setShowDeleteModal(false);
      setSelectedDeleteId(null);
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  };

  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setShowDeleteModal(true);
  };

  const editAdmin = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      isActive: admin.isActive,
    });
    setSelectedAdmin(admin);
    setShowForm(true);
    setError(null);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", password: "", isActive: true });
    setSelectedAdmin(null);
    setShowForm(false);
    setError(null);
  };

  if (loading) return <p>Loading admins...</p>;

  return (
    <div className="admin-users-page">
      <h1>Manage Admins</h1>
      {error && <p className="admin-error animate-fade">{error}</p>}

      {!showForm && (
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}>
          <Plus size={16} /> Add New Admin
        </button>
      )}

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Doe"
              value={formData.name}
              onChange={handleInputChange}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="e.g., admin@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">
              Password {selectedAdmin ? "(optional)" : ""}
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleInputChange}
              className="admin-input"
              required={!selectedAdmin}
            />
          </div>
          <div className="admin-form-group">
            <label
              className="admin-label"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
              />
              Active Account
            </label>
          </div>
          <div className="admin-actions-group">
            <button type="submit" className="admin-btn admin-btn-primary">
              {selectedAdmin ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={resetForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.role}</td>
                <td>
                  <span
                    style={{
                      color: admin.isActive ? "green" : "red",
                      fontWeight: 500,
                    }}>
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td>
                  <div className="admin-actions-group">
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => editAdmin(admin)}>
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className="admin-btn admin-btn-danger admin-btn-sm"
                      onClick={() => openDeleteModal(admin._id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PopUp
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this admin?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Users_AdminPage;
