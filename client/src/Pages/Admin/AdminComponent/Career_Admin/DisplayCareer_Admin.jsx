import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./../../../../Utils/config.js";

import { Edit, Trash2, Trash } from "lucide-react";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const UPLOADS_BASE = "http://localhost:7001";

export default function DisplayCareer_Admin({ onEdit, refreshTrigger }) {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const token = getToken();
  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchCareers = async () => {
    try {
      setLoading(true);
      // Dynamically build URL based on state
      const url = showDeleted
        ? `${API_BASE}/careers/admin?showDeleted=true` // Bin Mode
        : `${API_BASE}/careers/admin`; // Active Mode (default)

      const res = await axios.get(url, authConfig);
      setCareers(res.data?.items || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, [showDeleted, refreshTrigger]); // Re-run when mode changes OR parent refreshes

  const handleRestore = async (id) => {
    try {
      // Step A: Call the API (POST request)
      await axios.post(
        `${API_BASE}/careers/admin/${id}/restore`,
        {}, // Empty body because the ID is in the URL
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Step B: Refresh the data
      // We call the main fetch function again to get the updated status from the server
      fetchCareers();
      alert("Career restored successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to restore.");
    }
  };

  // 1. Define the function
  const handleDelete = async (id) => {
    // Step A: Safety Check
    if (!window.confirm("Are you sure you want to delete this Career?")) return;

    try {
      // Step B: Call the API
      // We pass the ID in the URL: /api/careers/admin/123
      await axios.delete(`${API_BASE}/careers/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Step C: Update the UI (Optimistic Update)
      // "Keep all careers where the ID is NOT the one we just deleted"
      setCareers((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="admin-add-from-container">
      <div className="diplay-item-page-head-container">
        <h2>Our Careers ({careers.length})</h2>
        {/* 👇 REPLACED BUTTON WITH CHECKBOX 👇 */}
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
      {careers.length === 0 ? (
        <p className="admin-empty-text">No career found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Date Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr key={career._id}>
                <td style={{ width: "" }}>
                  <strong>{career.title}</strong>
                </td>
                <td style={{ width: "" }}>
                  {career.image ? (
                    <img
                      src={`${UPLOADS_BASE}${career.image}`}
                      className="admin-thumb"
                      alt={career.title}
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td style={{ width: "" }}>{career.excerpt}</td>
                <td style={{ width: "" }}>
                  <strong>
                    {new Date(career.createdAt).toLocaleDateString()}
                  </strong>
                </td>
                <td style={{ width: "" }}>
                  {/* Utilized the admin-actions-group class */}
                  <div className="admin-actions-group">
                    {career.isDeleted ? (
                      <button
                        onClick={() => handleRestore(career._id)}
                        className="admin-btn admin-btn-secondary admin-btn-sm">
                        <Edit size={14} /> Restore
                      </button>
                    ) : (
                      <>
                        {" "}
                        <button
                          onClick={() => onEdit(career)} // Send the whole career object up!
                          className="admin-btn admin-btn-secondary admin-btn-sm">
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(career._id)}
                          className="admin-btn admin-btn-danger admin-btn-sm">
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
    </div>
  );
}
