import React, { useState, useEffect } from "react";
import "./Career.css";
import SectionHero from "../Components/SectionHero";
import ServiceHeroBg from "../../../assets/HomeHero/herobg-1.webp";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";

export default function Career() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/careers`);
      if (!res.ok) throw new Error(`Failed to fetch careers: ${res.status}`);
      const data = await res.json();
      setCareers(data.items || []);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setError("Failed to load career opportunities");
    } finally {
      setLoading(false);
    }
  };

  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="career-page">
      {/* Hero Section */}
      <SectionHero
        bgImage={ServiceHeroBg}
        title="Join Our Team"
        description="Explore exciting career opportunities and grow with us at Dyno Innovations"
      />

      {/* Career Listings */}
      <section className="career-section section-container">
        {/* Search Bar */}
        <div className="career-search-container">
          <input
            type="text"
            placeholder="Search career opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="career-search-input"
          />
        </div>

        {/* Loading, Error, Empty States */}
        {loading ? (
          <div className="career-loading">
            <p>Loading career opportunities...</p>
          </div>
        ) : error ? (
          <div className="career-error">
            <p>{error}</p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="career-empty">
            <p>No positions available at the moment.</p>
          </div>
        ) : (
          <div className="career-posts-grid">
            {filteredCareers.map((career) => (
              <div key={career._id} className="career-post-card">
                {career.image && (
                  <div className="career-post-image-container">
                    <img
                      src={`http://localhost:7001${career.image}`}
                      alt={career.title}
                      className="career-post-image"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                )}
                <div className="career-post-content">
                  <h3 className="career-post-title">{career.title}</h3>
                  {career.excerpt && (
                    <p className="career-post-description">{career.excerpt}</p>
                  )}
                  <div className="career-post-footer">
                    <span className="career-post-date">
                      {career.createdAt
                        ? new Date(career.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
