// src/Pages/Public/Electricals/ElectricalAccessories.jsx
import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import SectionHero from "../Components/SectionHero";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";
import HeroBg from "../../../assets/HomeHero/herobg-1.webp";
import "./ElectricalAccessories.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

const ElectricalAccessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);

  // Fetch accessories from API
  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/electricals?limit=100`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setAccessories(data.items || []);

      // Build all images for lightbox
      const imgs = (data.items || []).flatMap((item) =>
        (item.images || []).map((src) => ({
          src: `http://localhost:7001${src}`,
        }))
      );
      setAllImages(imgs);
    } catch (err) {
      console.error("Error fetching accessories:", err);
      setError("Failed to load electrical accessories");
    } finally {
      setLoading(false);
    }
  };

  // Filter accessories
  const filteredAccessories = accessories.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Get unique categories and types
  const categories = [
    ...new Set(accessories.map((item) => item.category).filter(Boolean)),
  ];
  const types = [
    ...new Set(accessories.map((item) => item.type).filter(Boolean)),
  ];

  // Open lightbox at specific image
  const openLightbox = (imageIndex) => {
    setLightboxIndex(imageIndex);
    setOpen(true);
  };

  if (loading) {
    return (
      <>
        <SectionHero
          bgImage={HeroBg}
          title="Electrical Accessories"
          description="Premium Junction & Sunk Boxes"
        />
        <div className="ea-loading">Loading electrical accessories...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <SectionHero
          bgImage={HeroBg}
          title="Electrical Accessories"
          description="Premium Junction & Sunk Boxes"
        />
        <div className="ea-error">{error}</div>
      </>
    );
  }

  return (
    <>
      <SectionHero
        bgImage={HeroBg}
        title="Electrical Accessories"
        description="Premium Junction & Sunk Boxes"
      />

      {/* Search and Filter Section */}
      <section className="ea-filters-section">
        <div className="ea-container">
          <div className="ea-search-bar">
            <input
              type="text"
              placeholder="Search electrical accessories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="ea-search-input"
            />
          </div>

          <div className="ea-filter-controls">
            {categories.length > 0 && (
              <div className="ea-filter-group">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="ea-filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {types.length > 0 && (
              <div className="ea-filter-group">
                <label>Type:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="ea-filter-select"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {(selectedCategory || selectedType || searchTerm) && (
              <button
                className="ea-clear-filters"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedType("");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="ea-section">
        <div className="ea-container">
          <p className="ea-results-count">
            Showing {filteredAccessories.length} of {accessories.length}{" "}
            accessories
          </p>

          {filteredAccessories.length === 0 ? (
            <div className="ea-empty">
              No accessories found matching your filters.
            </div>
          ) : (
            <div className="ea-grid">
              {filteredAccessories.map((item) => {
                const itemImageStartIndex = accessories
                  .slice(0, accessories.indexOf(item))
                  .reduce((sum, acc) => sum + (acc.images?.length || 0), 0);

                return (
                  <div key={item._id} className="ea-card">
                    <h3 className="ea-card-title">{item.title}</h3>
                    {item.excerpt && (
                      <p className="ea-card-desc">{item.excerpt}</p>
                    )}
                    {item.category && (
                      <p className="ea-card-meta">
                        <strong>Category:</strong> {item.category}
                      </p>
                    )}
                    {item.type && (
                      <p className="ea-card-meta">
                        <strong>Type:</strong> {item.type}
                      </p>
                    )}
                    {item.price && (
                      <p className="ea-card-price">
                        <strong>Price:</strong> LKR {item.price}
                      </p>
                    )}

                    {item.images && item.images.length > 0 && (
                      <div className="ea-gallery">
                        {item.images.map((img, idx) => (
                          <div key={idx} className="ea-photo-wrapper">
                            <img
                              src={`http://localhost:7001${img}`}
                              alt={`${item.title} ${idx + 1}`}
                              className="ea-photo"
                              onClick={() =>
                                openLightbox(itemImageStartIndex + idx)
                              }
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="ea-card-footer">
                      <PurchaseButton item={item} itemType="electrical" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={allImages}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: "bottom" }}
      />
    </>
  );
};

export default ElectricalAccessories;
