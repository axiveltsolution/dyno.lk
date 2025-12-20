import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SearchBar from "./Components/SearchBar";
import FiltersBar from "./Components/FiltersBar";

import "./AutomotiveParts.css"; // Renamed CSS file

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

const HERO_BG = "https://picsum.photos/1920/1080?random=300";
const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const CRC_API_BASE = API.replace(/\/api$/, "");

export default function BikeList() {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchFilters = useCallback(async () => {
    try {
      const res = await fetch(`${API}/spares/filters/bikes`);
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
        `${API}/spares/search/bikes?${params.toString()}`
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

  return (
    <div className="dyno-auto-parts-page">
      {/* 1. SUB HERO */}
      <CommonHero
        title="Automotive Parts"
        subtitle="Select your vehicle to find compatible high-quality components."
        bgImage={HERO_BG}
        parentPage="Products"
      />

      <div className="container dyno-parts-container">
        {/* 2. SEARCH & FILTER DASHBOARD */}
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

        {/* 3. BIKE GRID */}
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
              to={`/automotive/bike/${b.slug}`}
              className="dyno-bike-card">
              <div className="bike-card-img">
                {b.image ? (
                  <img
                    src={`${CRC_API_BASE}${b.image}`}
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
      </div>

      <ContactBanner />
    </div>
  );
}
