import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Search, Filter, Box, Phone, ArrowRight } from "lucide-react";

import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";
import { API_BASE, getImageUrl } from "../../../Utils/config";
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
import heroBg from "../../../assets/ElectricalAccessories/ElectricalAccessories-hero.jpg";
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
  image:
    i % 2 === 0
      ? JUNCTION_BOX_IMAGES[i % JUNCTION_BOX_IMAGES.length]
      : SUNK_BOX_IMAGES[i % SUNK_BOX_IMAGES.length],
  price: (500 + i * 50).toFixed(2),
}));

// Backgrounds
const HERO_BG = heroBg;
const CTA_BG = ctaBg;

export default function ElectricalAccessories() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Lightbox State
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const bannerRef = useRef(null);

  useEffect(() => {
    fetchItems();
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("dyno-cta-visible");
        }
      },
      { threshold: 0.3 },
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        title="Electrical and Plastic Accessories"
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
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
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
                  ? getImageUrl(item.coverImage)
                  : item.images?.[0]
                    ? getImageUrl(item.images[0])
                    : null;

                const itemForCart = {
                  ...item,
                  images: item.images
                    ? item.images.map((img) => getImageUrl(img))
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

                      {/*<div className="card-overlay">
                        <Link
                          to={`/electricals/${item.slug}`}
                          className="view-details-link"
                        >
                          <Box size={24} />
                          <span>View Details</span>
                        </Link>
                      </div>*/}

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
                        {item.price > 0 && (
                          <span className="price-tag">LKR {item.price}</span>
                        )}

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

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${CTA_BG})` }}
      >
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">Electrical and Plastic Accessories Inquiries</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">
                Plastic Products Inquiries Hotline
              </span>
              <span className="dyno-phone-number">+94 77 228 9069</span>
            </div>
          </div>

          <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
            Contact Us Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={lightboxIndex}
        slides={items.map((item) => ({
          src: item.coverImage
            ? getImageUrl(item.coverImage)
            : item.images?.[0]
              ? getImageUrl(item.images[0])
              : "",
        }))}
        plugins={[Thumbnails, Zoom]}
      />
    </div>
  );
}
