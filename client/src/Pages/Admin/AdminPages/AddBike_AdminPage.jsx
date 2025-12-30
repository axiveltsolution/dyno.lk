import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";
import AdminBikesForm from "../AdminComponent/Bikes_Admin/BikesForm_Admin.jsx";
import AdminDisplayBikes from "../AdminComponent/Bikes_Admin/DisplayBikes_Admin.jsx";

import "./AdminPages.css";

export default function AddBike() {
  const [bikes, setBikes] = useState([]);
  const [editingBike, setEditingBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  // Scroll to top when editing
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE}/spares/bikes`
      );
      setBikes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, [token]);

  const handleEdit = (bike) => {
    setEditingBike(bike);
    scrollToTop();
  };

  const handleCancel = () => {
    setEditingBike(null);
  };

  const handleSave = (updatedBike) => {
    setBikes((prev) =>
      prev.map((b) => (b._id === updatedBike._id ? updatedBike : b))
    );
    setEditingBike(null);
  };

  const handleAdd = (newBike) => {
    setBikes((prev) => [newBike, ...prev]);
  };

  return (
    <div className="admin-bikes-page">
      <div className="admin-pages-header">
        <h1>Bikes Management</h1>
        <p>Manage all bikes and detailss</p>
      </div>
      <div>
        <div className="admin-form-section">
          <AdminBikesForm
            initial={editingBike}
            onSuccess={editingBike ? handleSave : handleAdd}
            onCancel={handleCancel}
          />
        </div>

        <div className="admin-list-section">
          {loading ? (
            <p>Loading bikes...</p>
          ) : (
            <AdminDisplayBikes
              bikes={bikes}
              onEdit={handleEdit}
              onDelete={(id) =>
                setBikes((prev) => prev.filter((b) => b._id !== id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
