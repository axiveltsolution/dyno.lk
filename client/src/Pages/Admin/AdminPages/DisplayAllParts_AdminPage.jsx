import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit, X } from "lucide-react";
import { Link } from "react-router-dom";
import { getToken } from "../../../Utils/config.js";

import SearchBar from "../../Admin/AdminComponent/Components/SearchBar.jsx";
import SmartFiltersBar from "../../Admin/AdminComponent/Components/FiltersBar.jsx";
import PopUp from "../../../Components/PopUp/PopUp.jsx"; // 1. Import PopUp

// IMPORT FORMS
import AdminSparePartsForm from "../AdminComponent/SpareParts_Admin/SparePartsForm_Admin.jsx";
import AdminElectricalForm from "../AdminComponent/Electricals_Admin/ElectricalForm_Admin.jsx";
// import AdminBikeForm from "../AdminComponent/Bike_Admin/BikeForm_Admin.jsx";

import "./AdminPages.css";
import "../AdminComponent/AdminComponents.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const UPLOADS = "http://localhost:7001";

export default function DisplayAllParts_AdminPage() {
  const [view, setView] = useState("all");
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [electricals, setElectricals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 2. Add Error State

  // EDIT STATE
  const [editingItem, setEditingItem] = useState(null);

  // SEARCH & FILTER STATE
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBike, setSelectedBike] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // MODAL STATE (New!)
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ id: null, type: null });

  const token = getToken();

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
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
      setError("Failed to load data.");
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

  // 3. Request Delete (Open Modal)
  const requestDelete = (id, type) => {
    setDeleteData({ id, type });
    setModalOpen(true);
  };

  // 4. Confirm Delete (Call API)
  const confirmDelete = async () => {
    const { id, type } = deleteData;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (type === "bike") {
        await axios.delete(`${API_BASE}/spares/admin/bikes/${id}`, config);
        setBikes((prev) => prev.filter((b) => b._id !== id));
      } else if (type === "part") {
        await axios.delete(`${API_BASE}/spares/admin/parts/${id}`, config);
        setSpareParts((prev) => prev.filter((p) => p._id !== id));
      } else if (type === "electrical") {
        await axios.delete(`${API_BASE}/electricals/admin/${id}`, config);
        setElectricals((prev) => prev.filter((i) => i._id !== id));
      }
      setModalOpen(false);
    } catch (err) {
      alert("Delete failed"); // Could replace with setError logic if you prefer
      setModalOpen(false);
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
      <div className="admin-pages-header">
        <h1>All parts Management</h1>
        <p>Manage all parts and details</p>
      </div>
      {error && <div className="admin-error animate-fade">{error}</div>}

      {/* --- EDIT PANEL --- */}
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
                + Add Bike
              </Link>
            )}
            {(view === "all" || view === "spare-parts") && (
              <Link
                to="/admin/add-spare-parts"
                className="admin-btn admin-btn-primary">
                + Add Spare Part
              </Link>
            )}
            {(view === "all" || view === "electricals") && (
              <Link
                to="/admin/add-electrical"
                className="admin-btn admin-btn-primary">
                + Add Electrical Item
              </Link>
            )}
          </div>

          {/* SEARCH BAR */}
          {view !== "all" && (
            <div style={{ margin: "1.5rem 0 1rem 0" }}>
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={`Search ${view.replace("-", " ")}...`}
              />
            </div>
          )}

          {/* FILTERS */}
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
                showBikeFilter={view === "spare-parts"}
                showTypeFilter={view === "electricals"}
                showCategoryFilter={view === "electricals"}
              />
            </div>
          )}
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
              <th style={{ width: "100%" }}>Name</th>
              {view === "all" && <th>Type</th>}
              {(view === "spare-parts" || view === "all") && <th>Bike</th>}
              {(view === "electricals" || view === "all") && <th>Type</th>}
              {view !== "bikes" && <th>Price</th>}
              <th>Image</th>
              <th style={{ minWidth: "150px" }}>Actions</th>
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
                  <td>{item.bike?.name || "—"}</td>
                )}
                {(view === "electricals" || view === "all") && (
                  <td>{item.type || "—"}</td>
                )}
                {view !== "bikes" && (
                  <td className="admin-price">
                    {item.price ? `${item.price}` : "—"}
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
                    "—"
                  )}
                </td>
                <td>
                  <div className="admin-actions-group">
                    {view !== "all" && (
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => handleEditClick(item)}>
                        <Edit size={14} /> Edit
                      </button>
                    )}

                    <button
                      // 5. Open Modal with Type
                      onClick={() => requestDelete(item._id, item.__type)}
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

      {/* 6. Render PopUp */}
      <PopUp
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
