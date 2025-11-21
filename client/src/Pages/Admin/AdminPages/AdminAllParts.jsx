import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getToken } from "./../../../Utils/config.js";
import SearchBar from "../../Public/SpareParts/Components/SearchBar.jsx";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminAllParts() {
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [electricals, setElectricals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
            part.category = "spare-parts";
            allParts.push(part);
          });
        } catch {
          /* ignore bikes with no parts */
        }
      }
      setSpareParts(allParts);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch spare parts");
    } finally {
      setLoading(false);
    }
  };

  const fetchElectricals = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/electricals/admin?page=1&limit=1000`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const electricalItems = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];
      electricalItems.forEach((item) => (item.category = "electricals"));
      setElectricals(electricalItems);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch electricals");
    }
  };

  useEffect(() => {
    fetchBikes();
    fetchParts();
    fetchElectricals();
  }, []);

  // ----------------------
  // CRUD operations
  // ----------------------
  const handleBikeDelete = async (id) => {
    if (!window.confirm("Delete this bike and all its parts?")) return;
    try {
      await axios.delete(`${API_BASE}/spares/admin/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBikes();
      fetchParts();
    } catch (err) {
      console.error(err);
      setError("Failed to delete bike");
    }
  };

  const handlePartDelete = async (id) => {
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

  const handleElectricalDelete = async (id) => {
    if (!window.confirm("Delete this electrical item?")) return;
    try {
      await axios.delete(`${API_BASE}/electricals/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchElectricals();
    } catch (err) {
      console.error(err);
      setError("Failed to delete electrical item");
    }
  };

  // ----------------------
  // Combine and filter data
  // ----------------------
  const allItems = [
    ...bikes.map((bike) => ({
      ...bike,
      category: "bikes",
      displayName: bike.name,
      displayPrice: "N/A",
      displayType: "Bike",
    })),
    ...spareParts.map((part) => ({
      ...part,
      category: "spare-parts",
      displayName: part.title,
      displayPrice: `$${part.price?.toFixed(2) || "0.00"}`,
      displayType: part.bike?.name || "N/A",
    })),
    ...electricals.map((item) => ({
      ...item,
      category: "electricals",
      displayName: item.title,
      displayPrice: item.price ? `LKR ${item.price}` : "N/A",
      displayType: `${item.category} • ${item.type}`,
    })),
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesSearch = item.displayName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ----------------------
  // Category options
  // ----------------------
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "bikes", label: "Bikes" },
    { value: "spare-parts", label: "Spare Parts" },
    { value: "electricals", label: "Electrical Parts" },
  ];

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="admin-allparts-page">
      <h2>All Parts & Accessories Management</h2>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-toolbar">
        <Link to="/admin/add-bike" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Bike
        </Link>
        <Link
          to="/admin/add-spare-parts"
          className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Spare Part
        </Link>
        <Link
          to="/admin/add-electrical"
          className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Electrical Item
        </Link>
      </div>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search all parts..."
      />

      <div className="admin-category-filter">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`admin-category-btn ${
              selectedCategory === cat.value ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.value)}>
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="admin-loading">Loading parts...</p>
      ) : filteredItems.length === 0 ? (
        <p className="admin-empty">No items found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Name</th>
              <th>Type/Details</th>
              <th>Price</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={`${item.category}-${item._id}`}>
                <td>
                  <span className={`admin-category-badge ${item.category}`}>
                    {item.category.replace("-", " ").toUpperCase()}
                  </span>
                </td>
                <td>{item.displayName}</td>
                <td>{item.displayType}</td>
                <td className="admin-price">{item.displayPrice}</td>
                <td>
                  {item.image || item.coverImage ? (
                    <img
                      src={`${API_BASE}${item.image || item.coverImage}`}
                      alt={item.displayName}
                      className="admin-thumb"
                    />
                  ) : (
                    <span className="admin-text-light">—</span>
                  )}
                </td>
                <td>
                  <div className="admin-actions">
                    {item.category === "bikes" && (
                      <button
                        onClick={() => handleBikeDelete(item._id)}
                        className="admin-btn-danger">
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                    {item.category === "spare-parts" && (
                      <button
                        onClick={() => handlePartDelete(item._id)}
                        className="admin-btn-danger">
                        <Trash2 size={14} /> Delete
                      </button>
                    )}
                    {item.category === "electricals" && (
                      <>
                        <button className="admin-btn-secondary">
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleElectricalDelete(item._id)}
                          className="admin-btn-danger">
                          <Trash2 size={14} /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
