// client/src/Pages/Admin/AdminPages/AddBike_AdminPage.jsx
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
  const formRef = useRef(null);
  const token = getToken();

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
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
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
    <div className="admin-add-page">
      <h2>Bikes Management</h2>

      {/* Form — Reusable */}
      <div ref={formRef} style={{ scrollMarginTop: "100px" }}>
        <AdminBikesForm
          initial={editingBike}
          onSuccess={editingBike ? handleSave : handleAdd}
          onCancel={handleCancel}
        />
      </div>

      {/* Table */}
      <div style={{ marginTop: "3rem" }}>
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
  );
}
