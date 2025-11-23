import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { getToken } from "../../../Utils/config.js";
import SearchBar from "../../Public/SpareParts/Components/SearchBar.jsx";
import FiltersBar from "../../Public/SpareParts/Components/FiltersBar.jsx";
import "./AdminPages.css";

import AdminElectricalForm from "./AddElectrical_AdminPage.jsx";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const UPLOADS_BASE = "http://localhost:7001";

export default function AdminElectricals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);
  const [editing, setEditing] = useState(null); // item to edit or null
  const [openForm, setOpenForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const token = getToken();

  async function fetchList() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      if (q) params.set("q", q);
      if (showDeleted) params.set("showDeleted", "true");
      const res = await fetch(
        `${API_BASE}/electricals/admin?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await res.json();
      setItems(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, [page, q, showDeleted]);

  async function handleDelete(id) {
    if (!confirm("Delete this accessory? (soft-delete)")) return;
    await fetch(`${API_BASE}/electricals/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchList();
  }

  async function handleRestore(id) {
    await fetch(`${API_BASE}/electricals/admin/${id}/restore`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchList();
  }

  // ----------------------
  // Filtering
  // ----------------------
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(q.toLowerCase()) &&
      (selectedCategory === "" || item.category === selectedCategory) &&
      (selectedType === "" || item.type === selectedType)
  );

  const categories = [...new Set(items.map((item) => item.category))];
  const types = [...new Set(items.map((item) => item.type))];

  return (
    <div className="admin-electricals-page">
      <h2>Electrical Accessories</h2>

      <div className="admin-toolbar">
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setEditing(null);
            setOpenForm(true);
          }}>
          <Plus size={16} /> Add Electrical Item
        </button>
      </div>

      <SearchBar
        value={q}
        onChange={setQ}
        placeholder="Search electrical items..."
      />
      <FiltersBar
        types={types}
        categories={categories}
        onSelectType={setSelectedType}
        onSelectCategory={setSelectedCategory}
        activeType={selectedType}
        activeCategory={selectedCategory}
      />
      <div className="contacts-filter">
        <label
          className="admin-checkbox"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
          Show Deleted
        </label>
      </div>

      {loading ? (
        <p className="admin-loading">Loading electrical items...</p>
      ) : filteredItems.length === 0 ? (
        <p className="admin-empty">No electrical items found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Type</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr
                key={item._id}
                className={item.isDeleted ? "contact-deleted" : ""}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td className="admin-price">
                  {item.price ? `LKR ${item.price}` : "—"}
                </td>
                <td>
                  {item.coverImage ? (
                    <img
                      src={
                        item.coverImage
                          ? `${UPLOADS_BASE}${item.coverImage}`
                          : "/placeholder.jpg"
                      }
                      alt={item.title}
                      className="admin-thumb"
                      onError={(e) => (e.target.src = "/placeholder.jpg")}
                    />
                  ) : (
                    <span className="admin-text-light">—</span>
                  )}
                </td>
                <td>
                  <div className="admin-actions">
                    <button
                      className="admin-btn-secondary"
                      onClick={() => {
                        setEditing(item);
                        setOpenForm(true);
                      }}>
                      <Edit size={14} /> Edit
                    </button>
                    {!item.isDeleted ? (
                      <button
                        className="admin-btn-danger"
                        onClick={() => handleDelete(item._id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    ) : (
                      <button
                        className="admin-btn-secondary"
                        onClick={() => handleRestore(item._id)}>
                        Restore
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Form modal */}
      {openForm && (
        <div className="modal">
          <div className="modal-body">
            <button className="modal-close" onClick={() => setOpenForm(false)}>
              ×
            </button>
            <AdminElectricalForm
              initial={editing}
              onSaved={() => {
                setOpenForm(false);
                fetchList();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
