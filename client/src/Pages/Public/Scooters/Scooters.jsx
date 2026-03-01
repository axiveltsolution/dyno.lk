import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import "./Scooters-ScooterDetails.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Random Dark BGs
const HERO_BG = "https://picsum.photos/1920/1080?random=101";
const BANNER_BG = "https://picsum.photos/1920/800?random=102";

// Mock Data
const scooters = [
  {
    id: 3,
    name: "Votex 125 EFI",
    image: "/src/assets/Scooters/vortex-side.png",
  },
  { id: 2, name: "DRV 125 EFI", image: "/src/assets/Scooters/drv-side.jpg" },
  {
    id: 1,
    name: "Scooby 125 EFI",
    image: "/src/assets/Scooters/scooby_side.jpg",
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
