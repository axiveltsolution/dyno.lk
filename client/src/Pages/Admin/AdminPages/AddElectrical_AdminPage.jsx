import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";
import AdminElectricalForm from "../AdminComponent/Electricals_Admin/ElectricalForm_Admin.jsx";
import AdminDisplayElectricals from "../AdminComponent/Electricals_Admin/DisplayElectricals_Admin.jsx";

// Import CSS
import "./AdminPages.css";

export default function AddElectrical() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const token = getToken();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/electricals/admin`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setItems(res.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token]);

  const handleSuccess = (savedItem) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) => (i._id === savedItem._id ? savedItem : i))
      );
      setEditingItem(null);
    } else {
      setItems((prev) => [savedItem, ...prev]);
    }
  };

  return (
    <div className="admin-electricals-page">
      <div className="admin-pages-header">
        <h1>Electrical Management</h1>
        <p>Manage all electrical items and details</p>
      </div>
      <div>
        <div className="admin-form-section">
          <AdminElectricalForm
            onSuccess={handleSuccess}
            initial={editingItem}
            onCancel={() => setEditingItem(null)}
          />
        </div>

        <div className="admin-list-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AdminDisplayElectricals
              items={items}
              onEdit={(item) => {
                setEditingItem(item);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={(id) =>
                setItems((prev) => prev.filter((i) => i._id !== id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
