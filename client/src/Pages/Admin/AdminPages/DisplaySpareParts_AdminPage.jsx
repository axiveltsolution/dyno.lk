import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getToken } from "../../../Utils/config.js";
import SearchBar from "../../Public/SpareParts/Components/SearchBar.jsx";
import FiltersBar from "../../Public/SpareParts/Components/FiltersBar.jsx";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminSpareParts() {
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [editing, setEditing] = useState(null); // item to edit or null
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState("");

  const token = getToken();

  // ----------------------
  // Fetch data
  // ----------------------
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

  // ----------------------
  // Part CRUD
  // ----------------------
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

  // ----------------------
  // Filtering
  // ----------------------
  const filteredSpareParts = spareParts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBike === "" || p.bike?.name === selectedBike)
  );

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="admin-spareparts-page">
      <h2>Spare Parts Management</h2>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-toolbar">
        <Link
          to="/admin/add-spare-parts"
          className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Spare Part
        </Link>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search spare parts..."
      />
      <FiltersBar
        types={bikes.map((b) => b.name)}
        categories={[]}
        onSelectType={setSelectedBike}
        onSelectCategory={() => {}}
        activeType={selectedBike}
        activeCategory=""
      />

      {loading ? (
        <p className="admin-loading">Loading spare parts...</p>
      ) : filteredSpareParts.length === 0 ? (
        <p className="admin-empty">No spare parts found</p>
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
            {filteredSpareParts.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>
                  {p.bike?.name || <span className="admin-text-light">—</span>}
                </td>
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
                    className="admin-btn-secondary"
                    onClick={() => {
                      setEditing(item);
                      setOpenForm(true);
                    }}>
                    <Edit size={14} /> Edit
                  </button>
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
