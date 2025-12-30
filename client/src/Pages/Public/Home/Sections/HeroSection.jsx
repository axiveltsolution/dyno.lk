import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Home.css"; // Ensure this path is correct for your project structure

// 3 Dark/Industrial Vibe Images
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?q=80&w=2000&auto=format&fit=crop", // Dark Scooter/Bike
  "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop", // Industrial Road
  "https://images.unsplash.com/photo-1498889444388-e67ea62c464b?q=80&w=2000&auto=format&fit=crop", // Factory/Tech Vibe
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // Change image every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  const handleExploreModels = () => {
    const element = document.querySelector(".scooter-showcase-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOurFactory = () => {
    navigate("/ourfactory");
  };

  return (
    <section className="hero-container">
      {/* 1. BACKGROUND LAYER (SLIDER) */}
      <div className="hero-bg-wrapper">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={index}
            className={`hero-bg-slide ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* The Gradient Overlay (Stays on top of images) */}
        <div className="hero-overlay-gradient"></div>

        {/* 3. DECORATIVE SIDE ELEMENTS */}
        <div className="hero-stat-box">
          <span className="stat-number">100%</span>
          <span className="stat-label">Local Assembly</span>
        </div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="hero-content">
        <div className="hero-text-block">
          <h4 className="hero-subtitle">
            <span className="subtitle-line"></span>
            Precision Engineering
          </h4>

          <h1 className="hero-title">
            Unleash <br />
            <span className="text-red">The Power</span> <br />
            To Ride
          </h1>

          <p className="hero-description">
            Proudly powering Sri Lanka’s mobility future. We combine local
            craftsmanship with advanced injection moulding technology to build
            the next generation of riders.
          </p>

          <div className="hero-buttons">
            <Link to="/scooters" className="btn btn-primary">
              Explore Models
            </Link>
            <Link to="/about" className="btn btn-outline">
              Our Factory
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
