import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./../Home.css";

import Typewriter from "../../../../Components/Typewriter/Typewriter";

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
        className="home-hero-bg-slider"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {bgImages.map((img, i) => (
          <div
            key={i}
            className={`home-hero-bg-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        className={`home-hero-nav-arrow left ${isHovered ? "show" : ""}`}
        onClick={goPrev}
        aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button
        className={`home-hero-nav-arrow right ${isHovered ? "show" : ""}`}
        onClick={goNext}
        aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      {/* MAIN CONTENT */}
      <div className="home-hero-container">
        {/* LEFT: Text */}
        <div className="home-hero-left">
          <div className="home-hero-content">
            <h1 className="home-hero-title">
              Unleash The Power To Ride{" "}
              <span>
                <Typewriter
                  phrases={[
                    "Beyond Limits",
                    "Beyond Roads",
                    "Beyond Ordinary",
                    "Beyond Horizon",
                  ]}
                  typingSpeed={50}
                  deletingSpeed={30}
                  pauseBeforeDelete={1500}
                  loop={true}
                />
              </span>
            </h1>
            <p className="home-hero-description">
              Enjoy award-winning stereo beats with wireless listening freedom
              and sleek, streamlined with premium padded and delivering
              first-rate playback.
            </p>
            <button type="button" className="btn btn-primary home-hero-btn">
              Discover Now
            </button>
          </div>
        </div>
      </div>

      {/* SOCIAL ICONS - RIGHT SIDE (VERTICAL) */}
      <div className="home-hero-social-right">
        <a href="#facebook" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#instagram" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#twitter" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </section>
  );
}
