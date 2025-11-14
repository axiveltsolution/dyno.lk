import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { getToken } from "./../../../Utils/config.js";
import "./AdminPages.css";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddBike() {
  const [bikeForm, setBikeForm] = useState({ name: "", image: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = getToken();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBikeForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
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
      setSuccess("Bike added successfully!");
      setBikeForm({ name: "", image: null });
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to add bike");
      setSuccess(null);
    }
  };

  return (
    <div className="admin-add-bike-page">
      <h2>Add New Bike</h2>

      {error && <p className="admin-error">{error}</p>}
      {success && <p className="admin-success">{success}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="admin-form-group">
          <label className="admin-label">Bike Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g., Honda CB300R"
            value={bikeForm.name}
            onChange={handleChange}
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
            onChange={handleChange}
            className="admin-file-input"
          />
        </div>

        <div className="admin-actions">
          <button type="submit" className="admin-btn admin-btn-primary">
            Add Bike
          </button>
        </div>
      </form>
    </div>
  );
}
