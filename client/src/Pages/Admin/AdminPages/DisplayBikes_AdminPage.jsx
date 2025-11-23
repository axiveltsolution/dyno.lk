// client/src/Pages/Admin/AdminPages/DisplayBikes_AdminPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";

import AdminToolbar from "../../Admin/AdminComponent/Components/AdminToolbar.jsx";
import SearchBar from "../../Admin/AdminComponent/Components/SearchBar.jsx";
import AdminDisplayBikes from "../../Admin/AdminComponent/Bikes_Admin/DisplayBikes_Admin.jsx";

import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function AdminBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = getToken();

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(res.data);
    } catch (err) {
      setError("Failed to load bikes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, [token]);

  const filteredBikes = bikes.filter((bike) =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setBikes((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="admin-bikes-page">
      <h1>Bikes Management</h1>
      {error && <p className="admin-error">{error}</p>}

      <AdminToolbar addPath="/admin/add-bike" addLabel="Add Bike" />

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search bikes..."
      />

      {loading ? (
        <p>Loading bikes...</p>
      ) : (
        <AdminDisplayBikes
          bikes={filteredBikes}
          onDelete={handleDelete}
          refresh={fetchBikes}
        />
      )}
    </div>
  );
}
