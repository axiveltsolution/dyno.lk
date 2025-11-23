import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getToken } from "../../../Utils/config.js";
import SearchBar from "../../Public/SpareParts/Components/SearchBar.jsx";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminBikes() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = getToken();

  // ----------------------
  // Fetch data
  // ----------------------
  const fetchBikes = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bikes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, []);

  // ----------------------
  // Bike CRUD
  // ----------------------
  const handleBikeDelete = async (id) => {
    if (!window.confirm("Delete this bike and all its parts?")) return;
    try {
      await axios.delete(`${API_BASE}/spares/admin/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBikes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete bike");
    }
  };

  // ----------------------
  // Filtering
  // ----------------------
  const filteredBikes = bikes.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="admin-bikes-page">
      <h2>Bikes Management</h2>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-toolbar">
        <Link to="/admin/add-bike" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Bike
        </Link>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search bikes..."
      />

      {loading ? (
        <p className="admin-loading">Loading bikes...</p>
      ) : filteredBikes.length === 0 ? (
        <p className="admin-empty">No bikes found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBikes.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>

                <td>
                  {b.image || b.coverImage ? (
                    <img
                      src={
                        b.image || b.coverImage
                          ? `http://localhost:7001${b.image || b.coverImage}`
                          : "/placeholder.jpg"
                      }
                      alt={b.name}
                      className="admin-thumb"
                    />
                  ) : (
                    <span className="admin-text-light">—</span>
                  )}
                </td>
                <td>
                  <button
                    className="admin-btn-danger"
                    onClick={() => handleBikeDelete(b._id)}>
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
