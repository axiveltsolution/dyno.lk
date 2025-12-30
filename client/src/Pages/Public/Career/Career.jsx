import React, { useState, useEffect } from "react";
import { Search, Calendar, Briefcase, Info } from "lucide-react";
import "./Career.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Hero BG
const CAREER_HERO = "https://picsum.photos/1920/1080?grayscale&random=404";
const CTA_BG = "https://picsum.photos/1920/800?grayscale&random=405";

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
      // Backend: GET /api/careers (Public List)
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

  // Client-side filtering (since backend list is simple)
  const filteredCareers = careers.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="career-page-wrapper">
      {/* 1. HERO */}
      <CommonHero
        title="Careers"
        subtitle="Join the Dyno Innovations Team"
        bgImage={CAREER_HERO}
        parentPage="Company"
      />

      <div className="container content-container">
        {/* 2. INSTRUCTIONS & SEARCH */}
        <div className="career-header-panel">
          <div className="instructions-box">
            <Info className="info-icon" size={24} />
            <p>
              Interested in a position? Please send your CV and cover letter to{" "}
              <a href="mailto:hr@dyno.lk" className="hr-email">
                hr@dyno.lk
              </a>{" "}
              quoting the job title in the subject line.
            </p>
          </div>

          <div className="career-search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Filter positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 3. LISTINGS GRID (Display Only) */}
        <section className="career-grid">
          {loading && (
            <div className="loading-message">Loading openings...</div>
          )}

          {error && <div className="error-message">{error}</div>}

          {!loading && !error && filteredCareers.length === 0 && (
            <div className="empty-message">
              <h3>No Positions Available</h3>
              <p>We don't have any open vacancies right now.</p>
            </div>
          )}

          {!loading &&
            filteredCareers.map((career) => (
              <div key={career._id} className="career-card">
                {/* Image Area (Visual Only) */}
                <div className="card-image-area">
                  {career.image ? (
                    <img
                      src={`http://localhost:7001${career.image}`}
                      alt={career.title}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="no-image-box">
                      <Briefcase size={32} />
                    </div>
                  )}
                </div>

                {/* Content Area (All Info Displayed Here) */}
                <div className="card-content-area">
                  <div className="card-header">
                    <h3 className="job-title">{career.title}</h3>
                    <div className="job-date">
                      <Calendar size={14} />
                      <span>
                        {new Date(career.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {career.excerpt && (
                    <div className="job-excerpt">
                      <p>{career.excerpt}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </section>
      </div>

      {/* 4. CTA */}
      <ContactBanner bgImage={CTA_BG} />
    </div>
  );
}
