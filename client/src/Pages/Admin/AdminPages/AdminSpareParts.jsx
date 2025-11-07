import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit, Trash2, Plus, X } from "lucide-react";
import { getToken } from "./../../../Utils/config.js";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AdminSpareParts() {
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showBikeForm, setShowBikeForm] = useState(false);
  const [showPartForm, setShowPartForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [bikeForm, setBikeForm] = useState({ name: "", image: null });
  const [partForm, setPartForm] = useState({
    bikeId: "",
    title: "",
    excerpt: "",
    description: "",
    price: 0,
    images: [],
  });

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
  // Bike CRUD
  // ----------------------
  const handleBikeChange = (e) => {
    const { name, value, files } = e.target;
    setBikeForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleBikeSubmit = async (e) => {
    e.preventDefault();
    if (!bikeForm.name) {
      setError("Bike name is required");
      return;
    }

    const data = new FormData();
    data.append("name", bikeForm.name);
    if (bikeForm.image) data.append("image", bikeForm.image);

    try {
      await axios.post(`${API_BASE}/spares/admin/bikes`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setShowBikeForm(false);
      setBikeForm({ name: "", image: null });
      setError(null);
      fetchBikes();
    } catch (err) {
      console.error(err);
      setError("Failed to create bike");
    }
  };

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

  // ----------------------
  // Part CRUD
  // ----------------------
  const handlePartChange = (e) => {
    const { name, value, files } = e.target;
    setPartForm((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handlePartSubmit = async (e) => {
    e.preventDefault();
    if (!partForm.bikeId || !partForm.title) {
      setError("Bike and title are required");
      return;
    }

    const data = new FormData();
    data.append("title", partForm.title);
    data.append("excerpt", partForm.excerpt);
    data.append("description", partForm.description);
    data.append("price", partForm.price);
    for (let i = 0; i < partForm.images.length; i++) {
      data.append("images", partForm.images[i]);
    }

    try {
      if (editId) {
        await axios.put(`${API_BASE}/spares/admin/parts/${editId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(
          `${API_BASE}/spares/admin/bikes/${partForm.bikeId}/parts`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      resetPartForm();
      fetchParts();
    } catch (err) {
      console.error(err);
      setError("Failed to save part");
    }
  };

  const handleEditPart = (part) => {
    setPartForm({
      bikeId: part.bike._id,
      title: part.title,
      excerpt: part.excerpt,
      description: part.description,
      price: part.price,
      images: [],
    });
    setEditId(part._id);
    setShowPartForm(true);
    setError(null);
  };

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

  const resetPartForm = () => {
    setPartForm({
      bikeId: "",
      title: "",
      excerpt: "",
      description: "",
      price: 0,
      images: [],
    });
    setEditId(null);
    setShowPartForm(false);
    setError(null);
  };

  // ----------------------
  // Render
  // ----------------------
  return (
    <div className="admin-spareparts-page">
      <h2>Spare Parts & Bikes Management</h2>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-toolbar">
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowBikeForm(!showBikeForm);
            setError(null);
          }}>
          <Plus size={16} /> Add Bike
        </button>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setShowPartForm(!showPartForm);
            setError(null);
          }}>
          <Plus size={16} /> Add Spare Part
        </button>
      </div>

      {/* --- Bike Form --- */}
      {showBikeForm && (
        <form onSubmit={handleBikeSubmit} className="admin-form">
          <h3>Add New Bike</h3>

          <div className="admin-form-group">
            <label className="admin-label">Bike Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter bike name"
              value={bikeForm.name}
              onChange={handleBikeChange}
              className="admin-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Bike Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleBikeChange}
              className="admin-file-input"
            />
          </div>

          <div className="admin-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              Save Bike
            </button>
            <button
              type="button"
              onClick={() => setShowBikeForm(false)}
              className="admin-btn admin-btn-secondary">
              <X size={14} /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* --- Spare Part Form --- */}
      {showPartForm && (
        <form onSubmit={handlePartSubmit} className="admin-form">
          <h3>{editId ? "Edit Spare Part" : "Add New Spare Part"}</h3>

          <div className="admin-form-group">
            <label className="admin-label">Select Bike</label>
            <select
              name="bikeId"
              value={partForm.bikeId}
              onChange={handlePartChange}
              className="admin-select"
              required>
              <option value="">Choose a bike...</option>
              {bikes.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Part Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter part title"
              value={partForm.title}
              onChange={handlePartChange}
              className="admin-input"
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Excerpt</label>
            <input
              type="text"
              name="excerpt"
              placeholder="Short description"
              value={partForm.excerpt}
              onChange={handlePartChange}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Description</label>
            <textarea
              name="description"
              placeholder="Detailed description"
              value={partForm.description}
              onChange={handlePartChange}
              className="admin-textarea"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Price</label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              value={partForm.price}
              onChange={handlePartChange}
              className="admin-input"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">
              Images {editId && "(optional for update)"}
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handlePartChange}
              className="admin-file-input"
            />
          </div>

          <div className="admin-actions">
            <button type="submit" className="admin-btn admin-btn-primary">
              {editId ? "Update Part" : "Create Part"}
            </button>
            <button
              type="button"
              onClick={resetPartForm}
              className="admin-btn admin-btn-secondary">
              <X size={14} /> Cancel
            </button>
          </div>
        </form>
      )}

      {/* --- Bikes List --- */}
      <h3>Bikes</h3>
      {bikes.length === 0 ? (
        <p className="admin-spareparts-empty">No bikes available</p>
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
            {bikes.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>
                  {b.image ? (
                    <img
                      src={`${API_BASE}/${b.image}`}
                      alt={b.name}
                      className="admin-thumb"
                    />
                  ) : (
                    <span className="admin-text-light">—</span>
                  )}
                </td>
                <td>
                  <button onClick={() => handleBikeDelete(b._id)}>
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* --- Spare Parts List --- */}
      <h3>Spare Parts</h3>
      {loading ? (
        <p className="admin-spareparts-loading">Loading spare parts...</p>
      ) : spareParts.length === 0 ? (
        <p className="admin-spareparts-empty">No spare parts found</p>
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
                  <button onClick={() => handleEditPart(p)}>
                    <Edit size={14} /> Edit
                  </button>
                  <button onClick={() => handleDeletePart(p._id)}>
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
