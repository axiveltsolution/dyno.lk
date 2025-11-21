import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../Utils/config.js";
import "./AdminPages.css";
import { Trash2 } from "lucide-react";

import TinyEditor from "../../../Components/TinyEditor/TinyEditor.jsx";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddSpareParts() {
  const [bikes, setBikes] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [partForm, setPartForm] = useState({
    bikeId: "",
    title: "",
    excerpt: "",
    description: "",
    price: 0,
    images: [],
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setPartForm((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
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
      setSuccess("Spare part added successfully!");
      setPartForm({
        bikeId: "",
        title: "",
        excerpt: "",
        description: "",
        price: 0,
        images: [],
      });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add spare part");
      setSuccess(null);
    }
  };

  return (
    <div className="admin-add-spareparts-page">
      <h2>Add New Spare Part</h2>

      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Select Bike</label>
          <select
            name="bikeId"
            value={partForm.bikeId}
            onChange={handleChange}
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
            placeholder="e.g., Brake Pad Set"
            value={partForm.title}
            onChange={handleChange}
            className="admin-input"
            required
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Excerpt</label>
          <input
            type="text"
            name="excerpt"
            placeholder="e.g., High-quality brake pads for optimal stopping power"
            value={partForm.excerpt}
            onChange={handleChange}
            className="admin-input"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <TinyEditor
            value={partForm.description}
            onChange={(content) =>
              setPartForm((prev) => ({ ...prev, description: content }))
            }
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Price</label>
          <input
            type="number"
            name="price"
            placeholder="e.g., 25.99"
            value={partForm.price}
            onChange={handleChange}
            className="admin-input"
            min="0"
            step="0.01"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-label">Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="admin-file-input"
          />
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            Add Spare Part
          </button>
        </div>
      </form>

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
