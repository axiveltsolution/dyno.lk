import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../Home.css"; // Ensure this path is correct for your project structure

// Import local hero images
import heroBg1 from "../../../../assets/HomeHero/herobg-1.jpg";
import heroBg2 from "../../../../assets/HomeHero/herobg-2.jpg";
import heroBg3 from "../../../../assets/HomeHero/herobg-3.jpg";
import heroBg4 from "../../../../assets/HomeHero/herobg-4.jpg";
import heroBg5 from "../../../../assets/HomeHero/herobg-5.jpg";
import heroBg6 from "../../../../assets/HomeHero/herobg-6.jpg";

// Desktop images (bikes on right side)
const DESKTOP_IMAGES = [heroBg1, heroBg2, heroBg3];
// Mobile images (bikes in middle)
const MOBILE_IMAGES = [heroBg4, heroBg5, heroBg6];

export default function HeroSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImages, setCurrentImages] = useState(DESKTOP_IMAGES);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setCurrentImages(mobile ? MOBILE_IMAGES : DESKTOP_IMAGES);
      setCurrentSlide(0); // Reset slide when switching image sets
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % currentImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(slideInterval);
  }, [currentImages]);

  return (
    <section className="hero-container">
      {/* 1. BACKGROUND LAYER (SLIDER) */}
      <div className="hero-bg-wrapper">
        {currentImages.map((img, index) => (
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
          <h4 className="hero-subtitle">
            <span className="subtitle-line"></span>
            We make <br />
            "Proudly Made in Sri Lanka" <br />
            a true Reality.
          </h4>

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
