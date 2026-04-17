import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import FiltersBar from "./Components/FiltersBar";

import "./AutomotiveParts.css";
import "../Home/Home.css";

// Import hero image
import automotiveHero from "../../../assets/AutomotiveParts/automotive-hero.jpg";
import PelletsBg from "../../../assets/capabilities/pellets-bg.jpg";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import { Phone, ArrowRight, ArrowUpRight } from "lucide-react";
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
              <Link
                to={`/contactus`}
                key={scooter.id}
                className="dyno-scooter-card">
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
              </Link>
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

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${PelletsBg})` }}>
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">Best person to call you</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">Call Us Directly</span>
              <span className="dyno-phone-number">+94 11 289 1666</span>
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
