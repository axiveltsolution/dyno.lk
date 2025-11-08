import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./../Home.css";

import Slide01 from "./../../../../assets/HomeHero/herobg-1.webp";
import Slide02 from "./../../../../assets/HomeHero/herobg-2.webp";
import Slide03 from "./../../../../assets/HomeHero/herobg-3.webp";

const bgImages = [Slide01, Slide02, Slide03];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % bgImages.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const goPrev = () =>
    setCurrent((c) => (c - 1 + bgImages.length) % bgImages.length);
  const goNext = () => setCurrent((c) => (c + 1) % bgImages.length);

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* BACKGROUND SLIDER */}
      <div
        className="bg-slider"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {bgImages.map((img, i) => (
          <div
            key={i}
            className={`bg-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        className={`nav-arrow left ${isHovered ? "show" : ""}`}
        onClick={goPrev}
        aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button
        className={`nav-arrow right ${isHovered ? "show" : ""}`}
        onClick={goNext}
        aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      {/* MAIN CONTENT */}
      <div className="hero-container">
        {/* LEFT: Text */}
        <div className="hero-left">
          <div className="hero-content">
            <h1 className="hero-title">Experience Media Like Never Before</h1>
            <p className="hero-description">
              Enjoy award-winning stereo beats with wireless listening freedom
              and sleek, streamlined with premium padded and delivering
              first-rate playback.
            </p>
            <button type="button" className="hero-btn">
              Discover Now
            </button>
          </div>
        </div>

        {/* RIGHT: Product Image Placeholder */}
        {/* <div className="hero-right">
          <div className="hero-image-placeholder" />
        </div> */}
      </div>

      {/* SOCIAL ICONS - RIGHT SIDE (VERTICAL) */}
      <div className="hero-social-right">
        <a href="#" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </section>
  );
}
