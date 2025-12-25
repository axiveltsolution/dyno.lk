import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./AutomotiveParts.css";
import CommonHero from "../../../Components/CommonHero/CommonHero";
import PurchaseButton from "../../../Components/PurchaseButton/PurchaseButton";

const API = import.meta.env.VITE_API_BASE || "http://localhost:7001/api";
const CRC_API_BASE = API.replace(/\/api$/, "");

// Placeholder BG
const BIKE_BG = "https://picsum.photos/1920/1080?random=301";

export default function BikePage() {
  const { slug } = useParams();
  const [bike, setBike] = useState(null);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${API}/spares/bikes/${slug}`)
      .then((r) => r.json())
      .then((json) => {
        if (json.bike) setBike(json.bike);
        if (json.parts) setParts(json.parts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="dyno-loader">Loading details...</div>;
  if (!bike) return <div className="dyno-empty">Vehicle not found.</div>;

  return (
    <div className="dyno-auto-parts-page">
      {/* 1. HERO */}
      <CommonHero
        title={bike.name}
        subtitle={bike.excerpt || "Compatible Components & Accessories"}
        bgImage={BIKE_BG}
        parentPage="Automotive Parts"
      />

      <div className="container dyno-parts-container">
        {/* Breadcrumbs */}
        <div className="dyno-breadcrumbs">
          {/* Note: The back link should match your route structure */}
          <Link to="/plastic/spares" className="back-link">
            <ArrowLeft size={16} /> Back to Catalog
          </Link>
        </div>

        {/* Parts Grid */}
        <div className="dyno-parts-grid">
          {parts.length === 0 && (
            <div className="dyno-empty">
              No parts listed for this vehicle yet.
            </div>
          )}

          {parts.map((p) => {
            const itemForCart = {
              ...p,
              images: p.images
                ? p.images.map((i) => `${CRC_API_BASE}${i}`)
                : [],
            };

            return (
              <div key={p._id} className="dyno-part-card">
                {/* Note: Link matches route /spares/bike/:bikeSlug/part/:partSlug */}
                <Link
                  to={`/spares/bike/${bike.slug}/part/${p.slug}`}
                  className="part-card-link">
                  <div className="part-card-img">
                    {p.images && p.images[0] ? (
                      <img
                        src={`${CRC_API_BASE}${p.images[0]}`}
                        alt={p.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="part-card-body">
                    <h3>{p.title}</h3>
                    {p.excerpt && <p>{p.excerpt}</p>}
                    <span className="part-price">
                      {p.price ? `LKR ${p.price}` : "Price TBD"}
                    </span>
                  </div>
                </Link>

                <div className="part-card-actions">
                  <PurchaseButton item={itemForCart} itemType="spare-part" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
