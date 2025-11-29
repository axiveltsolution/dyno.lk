// client/src/Pages/Admin/AdminPages/DisplayElectricals_AdminPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";

import AdminToolbar from "../../Admin/AdminComponent/Components/AdminToolbar.jsx";
import SearchAndFilter from "../AdminComponent/Components/SearchAndFilter.jsx";
import AdminDisplayElectricals from "../../Admin/AdminComponent/Electricals_Admin/DisplayElectricals_Admin.jsx";

import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminElectricals() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showDeleted, setShowDeleted] = useState(false);

  const token = getToken();

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm) params.set("q", searchTerm);
      if (showDeleted) params.set("showDeleted", "true");

      const res = await axios.get(`${API_BASE}/electricals/admin?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data.items || []);
    } catch (err) {
      setError("Failed to load electrical items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, showDeleted, token]);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];
  const types = [...new Set(items.map((i) => i.type).filter(Boolean))];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || item.category === selectedCategory) &&
      (!selectedType || item.type === selectedType)
  );

  return (
    <div className="admin-electricals-page">
      <h1>Electrical Accessories Management</h1>
      {error && <p className="admin-error">{error}</p>}

      <AdminToolbar
        addPath="/admin/add-electrical"
        addLabel="Add Electrical Item"
      />

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        // types={types}
        // categories={categories}
        // selectedType={selectedType}
        // setSelectedType={setSelectedType}
        // selectedCategory={selectedCategory}
        // setSelectedCategory={setSelectedCategory}
      />

      <div className="contacts-filter" style={{ margin: "1rem 0" }}>
        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={showDeleted}
            onChange={(e) => setShowDeleted(e.target.checked)}
          />
          Show Deleted Items
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdminDisplayElectricals
          items={filtered}
          onDelete={(id) =>
            setItems((prev) => prev.filter((i) => i._id !== id))
          }
          onRestore={(id) => fetchData()}
        />
      )}
    </div>
  );
}
