// client/src/Pages/Admin/AdminPages/DisplaySpareParts_AdminPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "./../../../Utils/config.js";

import AdminToolbar from "../../Admin/AdminComponent/Components/AdminToolbar.jsx";
import SearchAndFilter from "../AdminComponent/Components/SearchAndFilter.jsx";
import AdminDisplaySpareParts from "./../AdminComponent/SpareParts_Admin/DisplaySpareParts_Admin.jsx";

import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminSpareParts() {
  const [spareParts, setSpareParts] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState("");

  const token = getToken();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const bikesRes = await axios.get(`${API_BASE}/spares/bikes`);
      const bikesData = bikesRes.data;
      setBikes(bikesData);

      const allParts = [];
      for (const bike of bikesData) {
        try {
          const partsRes = await axios.get(
            `${API_BASE}/spares/admin/bikes/${bike._id}/parts`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          partsRes.data.forEach((part) => {
            part.bike = { _id: bike._id, name: bike.name };
            allParts.push(part);
          });
        } catch {}
      }
      setSpareParts(allParts);
    } catch (err) {
      setError("Failed to load spare parts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const filteredSpareParts = spareParts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBike === "" || p.bike?.name === selectedBike)
  );

  const handleDelete = (id) => {
    setSpareParts((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="admin-spareparts-page">
      {error && <p className="admin-error">{error}</p>}

      <AdminToolbar />
      <SearchAndFilter
        bikes={bikes}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBike={selectedBike}
        setSelectedBike={setSelectedBike}
      />

      {loading ? (
        <p>Loading spare parts...</p>
      ) : (
        <AdminDisplaySpareParts
          spareParts={filteredSpareParts}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
