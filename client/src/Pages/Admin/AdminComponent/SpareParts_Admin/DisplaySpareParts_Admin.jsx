// client/src/Pages/Admin/AdminComponent/SpareParts_Admin/DisplaySpareParts_Admin.jsx
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../../Utils/config.js";
import { Trash2 } from "lucide-react";

import "./../../AdminPages/AdminPages.css";

export default function AdminDisplaySpareParts() {
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

  const token = getToken();

  const fetchBikes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bikes");
    }
  };

  const fetchParts = async () => {
    try {
      setLoading(true);
      const bikesRes = await axios.get(`${API_BASE}/spares/bikes`);
      const bikes = bikesRes.data;
      const allParts = [];

      for (const bike of bikes) {
        try {
          const partsRes = await axios.get(
            `${API_BASE}/spares/admin/bikes/${bike._id}/parts`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          partsRes.data.forEach((part) => {
            part.bike = { _id: bike._id, name: bike.name };
            allParts.push(part);
          });
        } catch {
          /* ignore bikes with no parts */
        }
      }
      setSpareParts(allParts);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch parts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
    fetchParts();
  }, []);

  const handleDeletePart = async (id) => {
    if (!window.confirm("Delete this part?")) return;
    try {
      await axios.delete(`${API_BASE}/spares/admin/parts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchParts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete part");
    }
  };
  return (
    <div>
      <h3>All Spare Parts</h3>
      {loading ? (
        <p>Loading spare parts...</p>
      ) : spareParts.length === 0 ? (
        <p>No spare parts found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Bike</th>
              <th>Price</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {spareParts.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.bike?.name || <span>—</span>}</td>
                <td className="admin-price">
                  ${p.price?.toFixed(2) || "0.00"}
                </td>
                <td>
                  <span className="admin-image-count">
                    {p.images?.length || 0}
                  </span>
                </td>
                <td>
                  <button
                    className="admin-btn-danger"
                    onClick={() => handleDeletePart(p._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
