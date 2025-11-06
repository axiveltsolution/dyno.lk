// src/AdminPages/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users, Edit, Trash2, Plus } from "lucide-react";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null); // For edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isActive: true,
  });
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation

  // Assume token is stored in localStorage after login
  const token = localStorage.getItem("adminToken");

  // Fetch all admins
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Admin fetch result:", res.data); // <--- Add this
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch admins");
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form for create or update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (selectedAdmin) {
        // Update (password optional)
        res = await axios.put(
          `${API_BASE}/admin/${selectedAdmin._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create (password required)
        if (!formData.password) {
          setError("Password is required for new admins");
          return;
        }
        res = await axios.post(`${API_BASE}/admin`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchAdmins(); // Refresh list
      resetForm();
    } catch (err) {
      setError(err.response?.data?.error || "Operation failed");
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
      setConfirmDelete(null);
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  };

  // Load selected admin into form for edit
  const editAdmin = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Password is optional on update
      isActive: admin.isActive,
    });
    setSelectedAdmin(admin);
    setShowForm(true);
    setError(null);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      isActive: true,
    });
    setSelectedAdmin(null);
    setShowForm(false);
    setError(null);
  };

  if (loading) return <p>Loading admins...</p>;

  return (
    <div className="admin-users-page">
      <h2>Manage Admins</h2>
      {error && (
        <p className="admin-error" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* Button to toggle create form */}
      <button
        className="admin-btn admin-btn-primary"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}>
        <Plus size={16} /> Add New Admin
      </button>

      {/* Form for create/edit */}
      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label">Name</label>
            <input
              type="text"
              name="name"
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
              value={formData.email}
              onChange={handleInputChange}
              className="admin-input"
              required
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">
              Password {selectedAdmin ? "(optional for update)" : ""}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="admin-input"
              required={!selectedAdmin}
            />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="admin-checkbox"
              />
              Active
            </label>
          </div>
          <div>
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

      {/* Admins Table */}
      <table
        className="admin-table"
        style={{
          width: "100%",
          marginTop: "2rem",
          borderCollapse: "collapse",
        }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin._id}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>{admin.isActive ? "Yes" : "No"}</td>
              <td>
                <button className="admin-btn" onClick={() => editAdmin(admin)}>
                  <Edit size={16} />
                </button>
                <button
                  className="admin-btn"
                  onClick={() => setConfirmDelete(admin._id)}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation */}
      {confirmDelete && (
        <div className="admin-confirm" style={{ marginTop: "1rem" }}>
          <p>Are you sure you want to delete this admin?</p>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleDelete(confirmDelete)}>
            Yes
          </button>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => setConfirmDelete(null)}>
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
