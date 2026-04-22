import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../Home.css"; // Ensure this path is correct for your project structure

// Import local hero images
import heroBg1 from "../../../../assets/HomeHero/herobg-1.jpg";
import heroBg2 from "../../../../assets/HomeHero/herobg-2.jpg";
import heroBg3 from "../../../../assets/HomeHero/herobg-3.jpg";

// Placeholder for mobile images - replace with actual mobile hero images
import heroBgMobile1 from "../../../../assets/HomeHero/herobg-4.jpeg"; // Change to mobile image path
import heroBgMobile2 from "../../../../assets/HomeHero/herobg-5.jpeg"; // Change to mobile image path
import heroBgMobile3 from "../../../../assets/HomeHero/herobg-6.jpeg"; // Change to mobile image path

// Desktop images
const DESKTOP_IMAGES = [heroBg1, heroBg2, heroBg3];

// Mobile images - update these with actual mobile-specific images
const MOBILE_IMAGES = [heroBgMobile1, heroBgMobile2, heroBgMobile3];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Select images based on screen size
  const images = isMobile ? MOBILE_IMAGES : DESKTOP_IMAGES;

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(slideInterval);
  }, [images.length]);

  const subtitle = (
    <h4 className="hero-subtitle">
      <span className="subtitle-line"></span>
      We make <br />
      "Proudly Made in Sri Lanka" <br />a true Reality
    </h4>
  );

  return (
    <section className="hero-container">
      {/* SUBTITLE AT TOP - ONLY FOR MOBILE */}
      {isMobile && <div className="hero-subtitle-container">{subtitle}</div>}

      {/* 1. BACKGROUND LAYER (SLIDER) */}
      <div className="hero-bg-wrapper">
        {images.map((img, index) => (
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
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="hero-content">
        <div className="hero-text-block">
          {!isMobile && subtitle}

          <h1 className="hero-title">
            Unleash high <span className="text-red">power to</span> weight ratio
          </h1>

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
