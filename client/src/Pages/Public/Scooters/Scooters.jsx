import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./Scooters.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Random Dark BGs
const HERO_BG = "https://picsum.photos/1920/1080?random=101";
const BANNER_BG = "https://picsum.photos/1920/800?random=102";

// Mock Data
const scooters = [
  {
    id: 1,
    name: "Arena 125",
    image: "https://picsum.photos/600/400?random=201",
  },
  { id: 2, name: "Elvissa", image: "https://picsum.photos/600/400?random=202" },
  { id: 3, name: "Scooby", image: "https://picsum.photos/600/400?random=203" },
  { id: 4, name: "Vortex", image: "https://picsum.photos/600/400?random=204" },
  {
    id: 5,
    name: "Yage 125",
    image: "https://picsum.photos/600/400?random=205",
  },
];

export default function Scooters() {
  return (
    <div className="dyno-scooters-page">
      {/* 1. SUB HERO */}
      <CommonHero
        title="Our Fleet"
        subtitle="Discover our range of high-quality scooters designed for performance, reliability, and the Sri Lankan road."
        bgImage={HERO_BG}
        parentPage="Products"
      />

      {/* 2. SCOOTER GRID */}
      <section className="dyno-scooters-section">
        <div className="container">
          <div className="dyno-scooters-grid">
            {scooters.map((scooter) => (
              <Link
                to={`/scooters/${scooter.id}`}
                key={scooter.id}
                className="dyno-scooter-card">
                <div className="scooter-card-img-box">
                  <img src={scooter.image} alt={scooter.name} />
                  <div className="scooter-overlay">
                    <span className="scooter-view-btn">View Model</span>
                  </div>
                </div>

                <div className="scooter-card-info">
                  <h3>{scooter.name}</h3>
                  <ArrowUpRight className="arrow-icon" size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <ContactBanner bgImage={BANNER_BG} />
    </div>
  );
}
