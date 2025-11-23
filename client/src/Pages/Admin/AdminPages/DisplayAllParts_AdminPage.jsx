import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getToken } from "../../../Utils/config.js";

import SearchBar from "../../Admin/AdminComponent/Components/SearchBar.jsx";
import SmartFiltersBar from "../../Admin/AdminComponent/Components/FiltersBar.jsx";

// IMPORT FORMS
import AdminSparePartsForm from "../AdminComponent/SpareParts_Admin/SparePartsForm_Admin.jsx";
import AdminElectricalForm from "../AdminComponent/Electricals_Admin/ElectricalForm_Admin.jsx";
// import AdminBikeForm from "../AdminComponent/Bike_Admin/BikeForm_Admin.jsx";

import "./AdminPages.css";
// Ensure shared CSS is imported
import "../AdminComponent/AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const UPLOADS = "http://localhost:7001";

export default function DisplayAllParts_AdminPage() {
  const [view, setView] = useState("all");
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [electricals, setElectricals] = useState([]);
  const [loading, setLoading] = useState(true);

  // EDIT STATE
  const [editingItem, setEditingItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = getToken();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const bikesRes = await axios.get(`${API_BASE}/spares/bikes`);
      setBikes(bikesRes.data);

      const allParts = [];
      for (const bike of bikesRes.data) {
        try {
          const partsRes = await axios.get(
            `${API_BASE}/spares/admin/bikes/${bike._id}/parts`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          partsRes.data.forEach((p) => {
            p.bike = bike;
            allParts.push(p);
          });
        } catch {}
      }
      setSpareParts(allParts);

      const elecRes = await axios.get(`${API_BASE}/electricals/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setElectricals(elecRes.data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [token]);

  // --- HANDLERS ---

  const handleEditClick = (item) => {
    setEditingItem(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSuccess = (updatedItem) => {
    if (!editingItem) return;

    if (editingItem.__type === "part") {
      const bikeObj = bikes.find(
        (b) => b._id === updatedItem.bike || b._id === updatedItem.bike?._id
      );
      const fullPart = {
        ...updatedItem,
        bike: bikeObj || updatedItem.bike,
        __type: "part",
      };
      setSpareParts((prev) =>
        prev.map((p) => (p._id === fullPart._id ? fullPart : p))
      );
    } else if (editingItem.__type === "electrical") {
      const fullElec = { ...updatedItem, __type: "electrical" };
      setElectricals((prev) =>
        prev.map((e) => (e._id === fullElec._id ? fullElec : e))
      );
    } else if (editingItem.__type === "bike") {
      const fullBike = { ...updatedItem, __type: "bike" };
      setBikes((prev) =>
        prev.map((b) => (b._id === fullBike._id ? fullBike : b))
      );
    }

    setEditingItem(null);
  };

  const deleteBike = async (id) => {
    if (!window.confirm("Delete this bike?")) return;
    try {
      await axios.delete(`${API_BASE}/spares/admin/bikes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBikes((prev) => prev.filter((b) => b._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const deletePart = async (id) => {
    if (!window.confirm("Delete this part?")) return;
    try {
      await axios.delete(`${API_BASE}/spares/admin/parts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpareParts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const deleteElectrical = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`${API_BASE}/electricals/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setElectricals((prev) => prev.filter((i) => i._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // Filter logic
  const getFilteredItems = () => {
    let items = [];
    if (view === "all" || view === "bikes") {
      items.push(...bikes.map((b) => ({ ...b, __type: "bike" })));
    }
    if (view === "all" || view === "spare-parts") {
      let parts = spareParts.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (selectedBike)
        parts = parts.filter((p) => p.bike?._id === selectedBike);
      items.push(...parts.map((p) => ({ ...p, __type: "part" })));
    }
    if (view === "all" || view === "electricals") {
      let elec = electricals.filter((i) =>
        i.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (selectedType) elec = elec.filter((i) => i.type === selectedType);
      if (selectedCategory)
        elec = elec.filter((i) => i.category === selectedCategory);
      items.push(...elec.map((i) => ({ ...i, __type: "electrical" })));
    }
    return items;
  };

  const items = getFilteredItems();
  const typeOptions = [
    ...new Set(electricals.map((e) => e.type).filter(Boolean)),
  ];
  const categoryOptions = [
    ...new Set(electricals.map((e) => e.category).filter(Boolean)),
  ];

  return (
    <div className="admin-allparts-page">
      <h1>All Parts Manager</h1>

      {/* --- 1. EDIT PANEL --- */}
      {editingItem && (
        <div className="admin-edit-panel">
          <div className="admin-edit-header">
            <h3 style={{ margin: 0, color: "var(--admin-brand)" }}>
              Editing: {editingItem.title || editingItem.name}
              <span
                className="admin-text-light"
                style={{ fontSize: "0.8rem", marginLeft: "10px" }}>
                ({editingItem.__type.toUpperCase()})
              </span>
            </h3>
            <button
              onClick={() => setEditingItem(null)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--admin-text)",
              }}>
              <X size={24} />
            </button>
          </div>

          {editingItem.__type === "part" && (
            <AdminSparePartsForm
              bikes={bikes}
              initial={editingItem}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingItem(null)}
            />
          )}

          {editingItem.__type === "electrical" && (
            <AdminElectricalForm
              initial={editingItem}
              onSuccess={handleEditSuccess}
              onCancel={() => setEditingItem(null)}
            />
          )}

          {editingItem.__type === "bike" && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>⚠️ Import AdminBikeForm to edit bikes here.</p>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="admin-category-tabs">
        {[
          { key: "all", label: "All Items" },
          { key: "spare-parts", label: "Spare Parts" },
          { key: "electricals", label: "Electricals" },
          { key: "bikes", label: "Bikes" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab ${view === tab.key ? "active" : ""}`}
            onClick={() => {
              setView(tab.key);
              setSearchTerm("");
              setEditingItem(null);
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Toolbar & Filters */}
      {!editingItem && (
        <>
          <div className="admin-toolbar">
            {(view === "all" || view === "bikes") && (
              <Link
                to="/admin/add-bike"
                className="admin-btn admin-btn-primary">
                Add Bike
              </Link>
            )}
            {(view === "all" || view === "spare-parts") && (
              <Link
                to="/admin/add-spare-parts"
                className="admin-btn admin-btn-primary">
                Add Spare Part
              </Link>
            )}
            {(view === "all" || view === "electricals") && (
              <Link
                to="/admin/add-electrical"
                className="admin-btn admin-btn-primary">
                Add Electrical Item
              </Link>
            )}
          </div>

          {/* ... Toolbar code above ... */}

          {/* 👇 KEY CHANGE: Only show filters for 'spare-parts' or 'electricals' 👇 */}

          {/* 1. SEARCH BAR: Show for Bikes, Parts, Electricals (Hide for 'All') */}
          {view !== "all" && (
            <div style={{ margin: "1.5rem 0 1rem 0" }}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Search ${view.replace("-", " ")}...`}
              />
            </div>
          )}

          {/* 2. FILTERS: Show ONLY for Spare Parts & Electricals (Hide for Bikes & All) */}
          {(view === "spare-parts" || view === "electricals") && (
            <div style={{ marginBottom: "1.5rem" }}>
              <SmartFiltersBar
                bikes={bikes}
                types={typeOptions}
                categories={categoryOptions}
                selectedBike={selectedBike}
                onSelectBike={setSelectedBike}
                selectedType={selectedType}
                onSelectType={setSelectedType}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                // Only enable specific dropdowns based on view
                showBikeFilter={view === "spare-parts"}
                showTypeFilter={view === "electricals"}
                showCategoryFilter={view === "electricals"}
              />
            </div>
          )}
          {/* 👆 END KEY CHANGE 👆 */}
        </>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="admin-empty">No items found</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              {view === "all" && <th>Type</th>}
              {(view === "spare-parts" || view === "all") && <th>Bike</th>}
              {(view === "electricals" || view === "all") && <th>Type</th>}
              {view !== "bikes" && <th>Price</th>}
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                  <strong>{item.name || item.title}</strong>
                </td>
                {view === "all" && (
                  <td>
                    <span className={`admin-category-badge ${item.__type}`}>
                      {item.__type.toUpperCase()}
                    </span>
                  </td>
                )}
                {(view === "spare-parts" || view === "all") && (
                  <td>{item.bike?.name || "-"}</td>
                )}
                {(view === "electricals" || view === "all") && (
                  <td>{item.type || "-"}</td>
                )}
                {view !== "bikes" && (
                  <td className="admin-price">
                    {item.price ? `${item.price}` : "-"}
                  </td>
                )}
                <td>
                  {item.image || item.coverImage || item.images?.[0] ? (
                    <img
                      src={`${UPLOADS}${
                        item.image || item.coverImage || item.images[0]
                      }`}
                      className="admin-thumb"
                      alt=""
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <div className="admin-actions-group">
                    {/* Hide Edit button if View is 'All' */}
                    {view !== "all" && (
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => handleEditClick(item)}>
                        <Edit size={14} /> Edit
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (item.__type === "bike") deleteBike(item._id);
                        if (item.__type === "part") deletePart(item._id);
                        if (item.__type === "electrical")
                          deleteElectrical(item._id);
                      }}
                      className="admin-btn admin-btn-danger admin-btn-sm">
                      <Trash2 size={14} />
                    </button>
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
