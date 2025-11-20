import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPages.css";
import { getToken } from "../../../Utils/config";

// Optional: if you have a config file, import it like this
// import { API_BASE } from "../../../utils/config";
const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);

  // 💡 GET THE TOKEN
  const token = getToken();

  // 💡 DEFINE A CONFIG OBJECT TO REUSE
  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch contact messages
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_BASE}/contact/admin?page=${page}&limit=${limit}&showDeleted=${showDeleted}`,
        authConfig
      );
      setContacts(res.data?.items || []);
      setTotalPages(res.data?.pages || 1);
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      alert(err.response?.data?.error || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, showDeleted]);

  // Toggle read/unread status
  const toggleRead = async (id, isRead) => {
    try {
      await axios.patch(
        `${API_BASE}/contact/admin/${id}/read`,
        { isRead: !isRead },
        authConfig
      );
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to update read status");
    }
  };

  // Delete contact message
  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      await axios.delete(`${API_BASE}/contact/admin/${id}`, authConfig);
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete message");
    }
  };

  // Restore deleted message
  const restoreContact = async (id) => {
    try {
      await axios.post(
        `${API_BASE}/contact/admin/${id}/restore`,
        {},
        authConfig
      );
      fetchContacts();
    } catch (err) {
      console.error(err);
      alert("Failed to restore message");
    }
  };

  return (
    <div className="admin-contacts-page">
      <h1>Contact Messages</h1>

      <div className="contacts-filter">
        <label>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={() => setShowDeleted(!showDeleted)}
            className="admin-checkbox"
          />
          Show Deleted
        </label>
      </div>

      {loading ? (
        <p className="contacts-loading">Loading...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Read</th>
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
                  <td className="contact-message">
                    {c.message?.length > 50
                      ? c.message.substring(0, 50) + "..."
                      : c.message || "-"}
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
                        className="contact-action-btn delete-btn">
                        Delete
                      </button>
                    ) : (
                      <button
                        onClick={() => restoreContact(c._id)}
                        className="contact-action-btn restore-btn">
                        Restore
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="contacts-pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}>
          Prev
        </button>
        <span className="contacts-pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
