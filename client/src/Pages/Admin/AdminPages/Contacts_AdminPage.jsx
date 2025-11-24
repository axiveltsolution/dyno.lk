import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config";
import "./AdminPages.css";
// Import shared styles for checkbox uniformity if needed
import "../AdminComponent/AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Contacts_AdminPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const [error, setError] = useState(null);

  const token = getToken();

  const authConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${API_BASE}/contact/admin?page=${page}&limit=${limit}&showDeleted=${showDeleted}`,
        authConfig
      );
      setContacts(res.data?.items || []);
      setTotalPages(res.data?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      setError(err.response?.data?.error || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showDeleted]);

  const toggleRead = async (id, isRead) => {
    try {
      await axios.patch(
        `${API_BASE}/contact/admin/${id}/read`,
        { isRead: !isRead },
        authConfig
      );
      fetchContacts();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_BASE}/contact/admin/${id}`, authConfig);
      fetchContacts();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const restoreContact = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/contact/admin/${id}/restore`,
        {},
        authConfig
      );
      fetchContacts();
    } catch (err) {
      alert("Failed to restore");
    }
  };

  return (
    <div className="admin-contacts-page">
      <h1>Contact Messages</h1>

      {error && <div className="admin-error animate-fade">{error}</div>}

      <div className="contacts-filter">
        <label
          style={{
            display: "flex",
            gap: "8px",
            cursor: "pointer",
          }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
          />
          <span className="admin-label">Show Deleted Messages</span>
        </label>
      </div>

      {loading ? (
        <p className="contacts-loading">Loading...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!contacts || contacts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="contacts-empty">
                    No messages found
                  </td>
                </tr>
              ) : (
                contacts.map((c) => (
                  <tr
                    key={c._id}
                    className={c.isDeleted ? "contact-deleted" : ""}>
                    <td>{c.name || "-"}</td>
                    <td>{c.email || "-"}</td>
                    <td>{c.phone || "-"}</td>
                    <td className="contact-message" title={c.message}>
                      {c.message}
                    </td>
                    <td>
                      <button
                        onClick={() => toggleRead(c._id, c.isRead)}
                        className={`contact-read-btn ${
                          c.isRead ? "is-read" : "is-unread"
                        }`}>
                        {c.isRead ? "Read" : "Unread"}
                      </button>
                    </td>
                    <td>
                      {!c.isDeleted ? (
                        <button
                          onClick={() => deleteContact(c._id)}
                          className="admin-btn admin-btn-danger admin-btn-sm">
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => restoreContact(c._id)}
                          className="admin-btn admin-btn-secondary admin-btn-sm">
                          Restore
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="contacts-pagination">
        <button
          className="admin-btn admin-btn-secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}>
          Prev
        </button>
        <span className="contacts-pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="admin-btn admin-btn-secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
