// client/src/Pages/Admin/AdminPages/AddElectrical_AdminPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";
import AdminElectricalForm from "../AdminComponent/Electricals_Admin/ElectricalForm_Admin.jsx";
import AdminDisplayElectricals from "../AdminComponent/Electricals_Admin/DisplayElectricals_Admin.jsx";

export default function AddElectrical() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ADD EDIT STATE
  const [editingItem, setEditingItem] = useState(null);

  const token = getToken();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/electricals/admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  // 2. UPDATED SUCCESS LOGIC (HANDLES ADD & EDIT)
  const handleSuccess = (savedItem) => {
    if (editingItem) {
      // If editing, replace the old item in the list
      setItems((prev) =>
        prev.map((i) => (i._id === savedItem._id ? savedItem : i))
      );
      setEditingItem(null); // Close edit mode
    } else {
      // If adding, add to top
      setItems((prev) => [savedItem, ...prev]);
    }
  };

  return (
    <div className="admin-add-spareparts-page">
      <div className="admin-split-layout">
        <div className="admin-form-section">
          {/* 3. CONNECT FORM PROPS */}
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
              // 4. CONNECT EDIT HANDLER & SCROLL
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
