import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, RotateCcw, Eye } from "lucide-react";
import { getToken } from "../../../../Utils/config.js";
import PopUp from "../../../../Components/PopUp/PopUp.jsx";
import "./../AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function DisplayContacts_Admin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination & Filter State
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20);
  const [showDeleted, setShowDeleted] = useState(false);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const token = getToken();
  const authConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch Logic
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${API_BASE}/contact/admin?page=${page}&limit=${limit}&showDeleted=${showDeleted}`,
        authConfig,
      );
      setContacts(res.data?.items || []);
      setTotalPages(res.data?.pages || 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showDeleted]);

  // Toggle Read Status
  const toggleRead = async (id, isRead) => {
    try {
      await axios.patch(
        `${API_BASE}/contact/admin/${id}/read`,
        { isRead: !isRead },
        authConfig,
      );
      // Optimistic update to avoid full reload flicker
      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: !isRead } : c)),
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Restore Logic
  const handleRestore = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/contact/admin/${id}/restore`,
        {},
        authConfig,
      );
      fetchContacts(); // Refresh list to remove it from "Deleted" view
    } catch (err) {
      alert("Failed to restore");
    }
  };

  // Delete Logic (Step 1: Open Modal)
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  // View Logic
  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setViewModalOpen(true);
  };

  // Delete Logic (Step 2: Confirm)
  const confirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE}/contact/admin/${deleteId}`, authConfig);
      fetchContacts(); // Refresh list
      setModalOpen(false);
    } catch (err) {
      alert("Failed to delete");
      setModalOpen(false);
    }
  };

  return (
    <div className="admin-display-container">
      {/* Header & Filter */}
      <div
        className="diplay-item-page-head-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <h3>
          {showDeleted ? "Deleted Messages" : "Inbox"} ({contacts.length})
        </h3>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => {
              setShowDeleted(!showDeleted);
              setPage(1); // Reset to page 1 when switching views
            }}
            className="admin-checkbox"
          />
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "var(--admin-text)",
            }}
          >
            Show Deleted
          </span>
        </label>
      </div>

      {error && <div className="admin-error animate-fade">{error}</div>}
      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contacts</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ minWidth: "140px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="admin-empty-text"
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      No messages found.
                    </td>
                  </tr>
                ) : (
                  contacts.map((c) => (
                    <tr key={c._id} style={{ opacity: c.isDeleted ? 0.6 : 1 }}>
                      <td>
                        <strong>{c.name}</strong>
                      </td>
                      <td>
                        <a
                          href={`mailto:${c.email}`}
                          style={{
                            color: "var(--admin-brand)",
                            textDecoration: "none",
                          }}
                        >
                          {c.email}
                        </a>
                        <div style={{ fontSize: "0.8em", color: "#666" }}>
                          {c.phone}
                        </div>
                      </td>
                      <td style={{ maxWidth: "300px" }} title={c.message}>
                        {c.message && c.message.length > 60
                          ? c.message.substring(0, 60) + "..."
                          : c.message}
                      </td>
                      <td style={{ fontSize: "0.9rem", color: "#666" }}>
                        {new Date(c.createdAt).toLocaleString("en-US", {
                          timeZone: "Asia/Colombo",
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => toggleRead(c._id, c.isRead)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "12px",
                            border: "none",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            background: c.isRead ? "#d1fae5" : "#fef3c7",
                            color: c.isRead ? "#065f46" : "#92400e",
                          }}
                        >
                          {c.isRead ? "Read" : "Unread"}
                        </button>
                      </td>
                      <td>
                        <div className="admin-actions-group">
                          <button
                            onClick={() => openViewModal(c)}
                            className="admin-btn admin-btn-primary admin-btn-sm"
                            style={{ marginRight: "8px" }}
                          >
                            <Eye size={14} /> View
                          </button>
                          {c.isDeleted ? (
                            <button
                              onClick={() => handleRestore(c._id)}
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                            >
                              <RotateCcw size={14} /> Restore
                            </button>
                          ) : (
                            <button
                              onClick={() => openDeleteModal(c._id)}
                              className="admin-btn admin-btn-danger admin-btn-sm"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className="contacts-pagination"
            style={{
              marginTop: "1.5rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>
              Page {page} of {totalPages}
            </span>
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedContact && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              padding: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0, color: "var(--admin-brand)" }}>
                Message Details
              </h3>
              <button
                onClick={() => setViewModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#6b7280",
                }}
              >
                ×
              </button>
            </div>

            <div style={{ lineHeight: 1.6 }}>
              <div style={{ marginBottom: "16px" }}>
                <strong>Name:</strong> {selectedContact.name}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${selectedContact.email}`}
                  style={{ color: "var(--admin-brand)" }}
                >
                  {selectedContact.email}
                </a>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong>Phone:</strong> {selectedContact.phone}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong>Date:</strong>{" "}
                {new Date(selectedContact.createdAt).toLocaleString("en-US", {
                  timeZone: "Asia/Colombo",
                })}
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    background: selectedContact.isRead ? "#d1fae5" : "#fef3c7",
                    color: selectedContact.isRead ? "#065f46" : "#92400e",
                  }}
                >
                  {selectedContact.isRead ? "Read" : "Unread"}
                </span>
              </div>
              <div>
                <strong>Message:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "12px",
                    background: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                >
                  {selectedContact.message}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setViewModalOpen(false)}
                className="admin-btn admin-btn-secondary"
              >
                Close
              </button>
              {!selectedContact.isDeleted && (
                <button
                  onClick={() => {
                    setViewModalOpen(false);
                    openDeleteModal(selectedContact._id);
                  }}
                  className="admin-btn admin-btn-danger"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PopUp Component */}
      <PopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Message"
        message="Are you sure you want to delete this message? It will be moved to the Recycle Bin."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
