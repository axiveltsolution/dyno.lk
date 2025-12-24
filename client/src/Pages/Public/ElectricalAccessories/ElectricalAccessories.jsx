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

// Import electrical images
import junctionBoxRD_R from "../../../assets/electrical/junction box/Juncion box RD _ R.png";
import junctionBoxRD_Black from "../../../assets/electrical/junction box/Juncion box RD black.png";
import junctionBoxRD_Gray from "../../../assets/electrical/junction box/Juncion box RD gray.png";
import junctionBoxRD_LightGreen from "../../../assets/electrical/junction box/Juncion box RD light green.png";
import junctionBoxRD_White from "../../../assets/electrical/junction box/Juncion box RD white.png";
import junctionBoxSQ_Black from "../../../assets/electrical/junction box/Juncion box SQ black.png";
import junctionBoxSQ_Gray from "../../../assets/electrical/junction box/Juncion box SQ gray.png";
import junctionBoxSQ_White from "../../../assets/electrical/junction box/Juncion box SQ white.png";

import sunkBoxDoubleBlack from "../../../assets/electrical/Sunk box/Sunk box double black.png";
import sunkBoxDoubleWhite from "../../../assets/electrical/Sunk box/Sunk box double white.png";
import sunkBoxDeepBlackCopy from "../../../assets/electrical/Sunk box/Sunkbox deep black - Copy.png";
import sunkBoxDeepBlack from "../../../assets/electrical/Sunk box/Sunkbox deep black.png";
import sunkBoxNormalGray from "../../../assets/electrical/Sunk box/Sunkbox normal gray.png";
import sunkBoxNormalWhite from "../../../assets/electrical/Sunk box/Sunkbox normal white.png";

// Import background images
import heroBg from "../../../assets/electrical/junction box/Juncion box RD white.png";
import ctaBg from "../../../assets/electrical/Sunk box/Sunk box double white.png";

// Image arrays for electrical products
const JUNCTION_BOX_IMAGES = [
  junctionBoxRD_R,
  junctionBoxRD_Black,
  junctionBoxRD_Gray,
  junctionBoxRD_LightGreen,
  junctionBoxRD_White,
  junctionBoxSQ_Black,
  junctionBoxSQ_Gray,
  junctionBoxSQ_White,
];

const SUNK_BOX_IMAGES = [
  sunkBoxDoubleBlack,
  sunkBoxDoubleWhite,
  sunkBoxDeepBlackCopy,
  sunkBoxDeepBlack,
  sunkBoxNormalGray,
  sunkBoxNormalWhite,
];

// --- MOCK DATA (For Design Purposes) ---
const MOCK_ITEMS = Array.from({ length: 8 }).map((_, i) => ({
  _id: i + 1,
  title: i % 2 === 0 ? "Industrial Junction Box" : "Sunk Box Type-A",
  category: i % 2 === 0 ? "Junction Boxes" : "Sunk Boxes",
  type: i % 3 === 0 ? "Heavy Duty" : "Standard",
  desc: "High-durability engineering plastic, weather-resistant and designed for industrial electrical applications.",
  image: i % 2 === 0 ? JUNCTION_BOX_IMAGES[i % JUNCTION_BOX_IMAGES.length] : SUNK_BOX_IMAGES[i % SUNK_BOX_IMAGES.length],
  price: (500 + i * 50).toFixed(2),
}));

// Backgrounds
const HERO_BG = heroBg;
const CTA_BG = ctaBg;

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
