import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import FiltersBar from "./Components/FiltersBar";

import "./AutomotiveParts.css";
import "../Home/Home.css";

// Import hero image
import automotiveHero from "../../../assets/AutomotiveParts/automotive-hero.jpg";
import PelletsBg from "../../../assets/capabilities/pellets-bg.webp";

// Components
// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import { Phone, ArrowRight, ArrowUpRight, Send, X } from "lucide-react";
import { API_BASE, getImageUrl } from "../../../Utils/config";

import "../Scooters/Scooters-ScooterDetails.css";
import scoobySideImg from "../../../assets/Scooters/scooby_side.jpg";
import drvSideImg from "../../../assets/Scooters/drv-side1.jpg";
import vortexSideImg from "../../../assets/Scooters/vortex-side.png";

const scooters = [
  {
    id: 3,
    name: "Votex 125 EFI",
    image: vortexSideImg,
  },
  { id: 2, name: "DRV 125 EFI", image: drvSideImg },
  {
    id: 1,
    name: "Scooby 125 EFI",
    image: scoobySideImg,
  },
];

const HERO_BG = automotiveHero;

export default function BikeList() {
  /*
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  */

  const bannerRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phonenumber: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenPopup = (e, scooterName) => {
    e.preventDefault();
    setFormData({
      name: "",
      phonenumber: "",
      email: "",
      message: `Hi, I am interested in ordering spare parts for the ${scooterName}. Could you please provide more information?`,
    });
    setStatus("");
    setErrorMsg("");
    setShowPopup(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phonenumber,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", phonenumber: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setShowPopup(false);
      }, 3000);
    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("dyno-cta-visible");
        }
      },
      { threshold: 0.3 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /*
  const fetchFilters = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/spares/filters/bikes`);
      const json = await res.json();
      setTypes(json.types || []);
      setCategories(json.categories || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchBikes = useCallback(async ({ q, type, category } = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (type) params.set("type", type);
      if (category) params.set("category", category);

      const res = await fetch(
        `${API_BASE}/spares/search/bikes?${params.toString()}`
      );
      const json = await res.json();
      setBikes(json.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchBikes({ q, type: typeFilter, category: categoryFilter });
  }, [fetchBikes, q, typeFilter, categoryFilter]);
  */

  return (
    <div className="dyno-auto-parts-page">
      {" "}
      {/* Updated Class Name */}
      {/* 1. HERO */}
      <CommonHero
        title="Spare Parts"
        subtitle="Select your vehicle to find compatible high-quality components."
        bgImage={HERO_BG}
        parentPage="Products"
      />
      <div className="container dyno-parts-container">
        {/* 2. DASHBOARD PANEL */}
        {/*
        <div className="dyno-dashboard-panel">
          <div className="dyno-search-row">
            <SearchBar
              value={q}
              onChange={setQ}
              placeholder="Search models, categories or types..."
            />
          </div>

          <div className="dyno-filters-row">
            <FiltersBar
              types={types}
              categories={categories}
              onSelectType={(t) =>
                setTypeFilter((prev) => (prev === t ? "" : t))
              }
              onSelectCategory={(c) =>
                setCategoryFilter((prev) => (prev === c ? "" : c))
              }
              activeType={typeFilter}
              activeCategory={categoryFilter}
            />
          </div>
        </div>
        */}

        {/* 2.5 SCOOTERS GRID WITH SPARE PARTS ORDER BUTTON */}
        <section className="dyno-scooters-section">
          <div className="dyno-scooters-grid" style={{ marginTop: '2rem', paddingBottom: '2rem' }}>
            {scooters.map((scooter) => (
              <div
                key={scooter.id}
                onClick={(e) => handleOpenPopup(e, scooter.name)}
                className="dyno-scooter-card"
                style={{ cursor: 'pointer' }}>
                <div className="scooter-card-img-box">
                  <img src={scooter.image} alt={scooter.name} />
                  <div className="scooter-overlay">
                    <span className="scooter-view-btn">Order Spare Parts</span>
                  </div>
                </div>

                <div className="scooter-card-info">
                  <h3>{scooter.name}</h3>
                  <ArrowUpRight className="arrow-icon" size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. BIKE GRID */}
        {/*
        <section className="dyno-bikes-grid">
          {loading && <div className="dyno-loader">Loading catalog...</div>}

          {!loading && bikes.length === 0 && (
            <div className="dyno-empty">
              No vehicles found matching your criteria.
            </div>
          )}

          {bikes.map((b) => (
            <Link
              key={b._id}
              to={`/spares/bike/${b.slug}`}
              className="dyno-bike-card">
              <div className="bike-card-img">
                {b.image ? (
                  <img
                    src={getImageUrl(b.image)}
                    alt={b.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="bike-card-overlay">
                  <span>View Parts</span>
                </div>
              </div>
              <div className="bike-card-body">
                <h3>{b.name}</h3>
                {b.excerpt && <p>{b.excerpt}</p>}
              </div>
            </Link>
          ))}
        </section>
        */}
      </div>

      {/* 4. POPUP OVERLAY */}
      {showPopup && (
        <div className="popup-overlay" style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem"
        }}>
          <div className="dyno-form-panel">
            <button
              onClick={() => setShowPopup(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: "0.5rem"
              }}
            >
              <X size={24} />
            </button>
            <form onSubmit={handleSubmit} className="dyno-form">
              <h3 className="form-heading">Spare Parts Inquiry</h3>

              <div className="contact-form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="dyno-input"
                />
              </div>

              <div className="contact-form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  placeholder="+94 77 ..."
                  className="dyno-input"
                  style={{ width: "100%", padding: "12px", borderRadius: "4px", border: "1px solid #333", background: "#222", color: "#fff" }}
                />
              </div>

              <div className="contact-form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label style={{ display: 'block', color: '#ccc', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="dyno-input"
                />
              </div>

              <div className="contact-form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="dyno-textarea"
                ></textarea>
              </div>

              {errorMsg && <div className="form-error" style={{ color: "#ff4d4f", marginBottom: "1rem", fontSize: "0.9rem" }}>{errorMsg}</div>}
              {status === "success" && (
                <div className="form-success" style={{ color: "#52c41a", marginBottom: "1rem", fontSize: "0.9rem" }}>Inquiry Submitted Successfully!</div>
              )}

              <button
                type="submit"
                className="form-submit-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Submit Inquiry"}
                {!status && <Send size={18} style={{ marginLeft: "10px" }} />}
              </button>
            </form>
          </div>
        </div>
      )}

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${PelletsBg})` }}>
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">Spare Parts and Repair Support</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">Spare Parts Hotline</span>
              <span className="dyno-phone-number">+94 76 789 9837</span>
            </div>
          </div>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">Scooter Service and Repairs Hotline</span>
              <span className="dyno-phone-number">+94 74 285 5299</span>
            </div>
          </div>

          <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
            Contact Us Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
