import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Search, Filter, Box, ArrowRight } from "lucide-react";

import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";
import "./ElectricalAccessories.css";

// --- MOCK DATA (For Design Purposes) ---
const MOCK_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
  _id: i + 1,
  title: i % 2 === 0 ? "Industrial Junction Box" : "Sunk Box Type-A",
  category: i % 2 === 0 ? "Junction Boxes" : "Sunk Boxes",
  type: i % 3 === 0 ? "Heavy Duty" : "Standard",
  desc: "High-durability engineering plastic, weather-resistant and designed for industrial electrical applications.",
  image: `https://picsum.photos/600/600?random=${500 + i}`, // Square images look technical
  price: (500 + i * 50).toFixed(2),
}));

// Backgrounds
const HERO_BG = "https://picsum.photos/1920/1080?random=91";
const CTA_BG = "https://picsum.photos/1920/800?random=92";

export default function ElectricalAccessories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Filter Logic
  const filteredItems = MOCK_ITEMS.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(MOCK_ITEMS.map((item) => item.category))];

  return (
    <div className="dyno-electrical-page">
      {/* 1. HERO */}
      <CommonHero
        title="Electrical Components"
        subtitle="Precision Engineered Junction & Sunk Boxes"
        bgImage={HERO_BG}
        parentPage="Products"
      />

      {/* 2. FILTER BAR (Sticky Tech Bar) */}
      <div className="dyno-filter-bar">
        <div className="container dyno-filter-container">
          {/* Search */}
          <div className="dyno-search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="dyno-filter-group">
            <Filter className="filter-icon" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          <div className="dyno-result-count">
            {filteredItems.length} Products Found
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <section className="dyno-product-section">
        <div className="container">
          {filteredItems.length === 0 ? (
            <div className="dyno-no-results">
              <h3>No Components Found</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="dyno-electrical-grid">
              {filteredItems.map((item, index) => (
                <div key={item._id} className="dyno-product-card">
                  {/* Image Area */}
                  <div
                    className="dyno-product-img-box"
                    onClick={() => {
                      setLightboxIndex(index);
                      setOpen(true);
                    }}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <div className="dyno-product-overlay">
                      <Box size={24} />
                      <span>Quick View</span>
                    </div>
                    <div className="dyno-product-badge">{item.type}</div>
                  </div>

                  {/* Content Area */}
                  <div className="dyno-product-content">
                    <span className="dyno-product-cat">{item.category}</span>
                    <h3 className="dyno-product-title">{item.title}</h3>
                    <p className="dyno-product-desc">{item.desc}</p>

                    <div className="dyno-product-footer">
                      <span className="dyno-price">LKR {item.price}</span>
                      <button className="dyno-enquire-btn">
                        Details <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. CTA */}
      <ContactBanner bgImage={CTA_BG} />

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={filteredItems.map((item) => ({ src: item.image }))}
        plugins={[Thumbnails, Zoom]}
      />
    </div>
  );
}
