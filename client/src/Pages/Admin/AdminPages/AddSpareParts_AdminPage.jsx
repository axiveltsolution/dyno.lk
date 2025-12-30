import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";

import AdminSparePartsForm from "../AdminComponent/SpareParts_Admin/SparePartsForm_Admin.jsx";
import AdminDisplaySpareParts from "./../AdminComponent/SpareParts_Admin/DisplaySpareParts_Admin.jsx";

// Import CSS
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AddSpareParts_AdminPage() {
  const [spareParts, setSpareParts] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPart, setEditingPart] = useState(null);

  const token = getToken();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const bikesRes = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(bikesRes.data);

      const all = [];
      for (const bike of bikesRes.data) {
        try {
          const parts = await axios.get(
            `${API_BASE}/spares/admin/bikes/${bike._id}/parts`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          parts.data.forEach((p) => {
            p.bike = { _id: bike._id, name: bike.name };
            all.push(p);
          });
        } catch {}
      }
      setSpareParts(all);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [token]);

  const handleSuccess = (savedPart) => {
    const bikeObj = bikes.find(
      (b) => b._id === savedPart.bike || b._id === savedPart.bike?._id
    );
    const partForDisplay = {
      ...savedPart,
      bike: bikeObj ? { _id: bikeObj._id, name: bikeObj.name } : savedPart.bike,
    };

    if (editingPart) {
      setSpareParts((prev) =>
        prev.map((p) => (p._id === partForDisplay._id ? partForDisplay : p))
      );
      setEditingPart(null);
    } else {
      setSpareParts((prev) => [partForDisplay, ...prev]);
    }
  };

  return (
    <div className="admin-spareparts-page">
      <div className="admin-pages-header">
        <h1>Spare Parts Management</h1>
        <p>Manage all spare parts and details</p>
      </div>
      <div>
        <div className="admin-form-section">
          <AdminSparePartsForm
            bikes={bikes}
            initial={editingPart}
            onSuccess={handleSuccess}
            onCancel={() => setEditingPart(null)}
          />
        </div>

        <div className="admin-list-section">
          {loading ? (
            <p>Loading spare parts...</p>
          ) : (
            <AdminDisplaySpareParts
              spareParts={spareParts}
              onEdit={(part) => {
                setEditingPart(part);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={(id) =>
                setSpareParts((prev) => prev.filter((p) => p._id !== id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
