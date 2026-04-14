import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Phone, ArrowRight } from "lucide-react";
import "./Scooters-ScooterDetails.css";
import "../Home/Home.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";

// Import images
import scoobySideImg from "../../../assets/Scooters/scooby_side.jpg";
import drvSideImg from "../../../assets/Scooters/drv-side.jpg";
import vortexSideImg from "../../../assets/Scooters/vortex-side.png";

// Import hero image
import scootersHero from "../../../assets/scooterspage/scooters.jpg";
import PelletsBg from "../../../assets/capabilities/pellets-bg.jpg";

// Random Dark BGs
const HERO_BG = scootersHero;
const BANNER_BG = "https://picsum.photos/1920/800?random=102";

// Mock Data
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

export default function Scooters() {
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
