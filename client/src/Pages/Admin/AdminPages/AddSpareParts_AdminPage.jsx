// client/src/Pages/Admin/AdminPages/AddSpareParts_AdminPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";

import AdminSparePartsForm from "../AdminComponent/SpareParts_Admin/SparePartsForm_Admin.jsx";
import AdminDisplaySpareParts from "./../AdminComponent/SpareParts_Admin/DisplaySpareParts_Admin.jsx";

import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AddSpareParts_AdminPage() {
  const [spareParts, setSpareParts] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. NEW STATE: Track which part is being edited
  const [editingPart, setEditingPart] = useState(null);

  const token = getToken();

  const fetchAll = async () => {
    try {
      setLoading(true);
      const bikesRes = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(bikesRes.data);

      const all = [];
      // Note: This loop is a bit slow (N+1 problem), but if it works for you, keep it for now.
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

  // 2. UPDATED LOGIC: Handle both ADD and EDIT updates instantly
  const handleSuccess = (savedPart) => {
    // Ensure the bike object is formatted correctly for display
    // (Sometimes backend returns populated object, sometimes just ID)
    const bikeObj = bikes.find(
      (b) => b._id === savedPart.bike || b._id === savedPart.bike?._id
    );

    const partForDisplay = {
      ...savedPart,
      bike: bikeObj ? { _id: bikeObj._id, name: bikeObj.name } : savedPart.bike,
    };

    if (editingPart) {
      // EDIT MODE: Find the old item and swap it with the new one
      setSpareParts((prev) =>
        prev.map((p) => (p._id === partForDisplay._id ? partForDisplay : p))
      );
      setEditingPart(null); // Exit edit mode
    } else {
      // ADD MODE: Add to top
      setSpareParts((prev) => [partForDisplay, ...prev]);
    }
  };

  return (
    <div className="admin-add-spareparts-page">
      <div className="admin-split-layout">
        <div className="admin-form-section">
          {/* 3. CONNECT THE EDIT STATE TO THE FORM */}
          <AdminSparePartsForm
            bikes={bikes}
            initial={editingPart} // <--- This switches the form to "Edit Mode"
            onSuccess={handleSuccess}
            onCancel={() => setEditingPart(null)} // <--- Allows canceling edit
          />
        </div>
        <div className="admin-list-section">
          {loading ? (
            <p>Loading spare parts...</p>
          ) : (
            <AdminDisplaySpareParts
              spareParts={spareParts}
              // 👇 UPDATE THIS PART 👇
              onEdit={(part) => {
                setEditingPart(part);
                // This scrolls the window to the very top smoothly
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              // 👆 END UPDATE 👆

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
