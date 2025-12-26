import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Search, Filter, Box } from "lucide-react";

import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";
import "./ElectricalAccessories.css";

// Backgrounds
const HERO_BG = "https://picsum.photos/1920/1080?random=91";
const CTA_BG = "https://picsum.photos/1920/800?random=92";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const CRC_API_BASE = API_BASE.replace(/\/api$/, "");

export default function ElectricalAccessories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Lightbox State
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchItems();
  }, [searchTerm, selectedCategory]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("q", searchTerm);
      if (selectedCategory) params.append("category", selectedCategory);

      const res = await fetch(`${API_BASE}/electricals?${params.toString()}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error("Failed to fetch electricals:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ];

  return (
    <div className="electrical-page-wrapper">
      {/* 1. HERO */}
      <CommonHero
        title="Electrical Components"
        subtitle="Precision Engineered Junction & Sunk Boxes"
        bgImage={HERO_BG}
        parentPage="Products"
      />

      {/* 2. FILTER BAR */}
      <div className="filter-bar">
        <div className="container filter-inner">
          <div className="search-group">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-dropdown">
            <Filter className="filter-icon" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="result-count">{items.length} Products Found</div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <section className="grid-section">
        <div className="container">
          {loading ? (
            <div className="loading-state">Loading catalog...</div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <h3>No Components Found</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="items-grid">
              {items.map((item, index) => {
                const imgSrc = item.coverImage
                  ? `${CRC_API_BASE}${item.coverImage}`
                  : item.images?.[0]
                  ? `${CRC_API_BASE}${item.images[0]}`
                  : null;

                const itemForCart = {
                  ...item,
                  images: item.images
                    ? item.images.map((img) => `${CRC_API_BASE}${img}`)
                    : [],
                };

                // Check description/excerpt
                const hasText = item.excerpt && item.excerpt.trim().length > 0;

                return (
                  <div key={item._id} className="item-card">
                    {/* Image Area */}
                    <div className="card-image-area">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={item.title}
                          loading="lazy"
                          onClick={() => {
                            setLightboxIndex(index);
                            setOpen(true);
                          }}
                        />
                      ) : (
                        <span className="no-image-placeholder">No Image</span>
                      )}

                      <div className="card-overlay">
                        <Link
                          to={`/electricals/${item.slug}`}
                          className="view-details-link">
                          <Box size={24} />
                          <span>View Details</span>
                        </Link>
                      </div>

                      {item.type && (
                        <div className="type-badge">{item.type}</div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="card-content">
                      <span className="card-category">{item.category}</span>
                      <h3 className="card-title">{item.title}</h3>

                      {/* --- CARD DESCRIPTION UPDATE --- */}
                      <p className={`card-desc ${!hasText ? "missing" : ""}`}>
                        {hasText ? item.excerpt : "No description available."}
                      </p>

                      <div className="card-footer">
                        <span className="price-tag">
                          {item.price ? `LKR ${item.price}` : "Price TBD"}
                        </span>

                        <PurchaseButton
                          item={itemForCart}
                          itemType="electrical"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ContactBanner bgImage={CTA_BG} />

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={items.map((item) => ({
          src: item.coverImage
            ? `${CRC_API_BASE}${item.coverImage}`
            : item.images?.[0]
            ? `${CRC_API_BASE}${item.images[0]}`
            : "",
        }))}
        plugins={[Thumbnails, Zoom]}
      />
    </div>
  );
}
