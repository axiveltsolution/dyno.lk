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

import Typewriter from "../../../../Components/Typewriter/Typewriter";

import Slide01 from "./../../../../assets/HomeHero/abc.jpg";
import Slide02 from "./../../../../assets/HomeHero/abc.jpg";
import Slide03 from "./../../../../assets/HomeHero/abc.jpg";

const bgImages = [Slide01, Slide02, Slide03];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // AUTO-SLIDE (working)
  useEffect(() => {
    const id = setInterval(() => {
      if (!isHovered) {
        setCurrent((c) => (c + 1) % bgImages.length);
      }
    }, 4500);
    return () => clearInterval(id);
  }, [isHovered]);

  const goPrev = () =>
    setCurrent((c) => (c - 1 + bgImages.length) % bgImages.length);
  const goNext = () => setCurrent((c) => (c + 1) % bgImages.length);

  return (
    <section
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* BACKGROUND SLIDER */}
      <div
        className="home-hero-bg-slider"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {bgImages.map((img, i) => (
          <div
            key={i}
            className={`home-hero-bg-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      {/* NAV ARROWS */}
      <button
        className={`home-hero-nav-arrow left ${isHovered ? "show" : ""}`}
        onClick={goPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className={`home-hero-nav-arrow right ${isHovered ? "show" : ""}`}
        onClick={goNext}
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* MAIN CONTENT */}
      <div className="home-hero-container">
        <div className="home-hero-left">
          <div className="home-hero-content">
            <h1 className="home-hero-title">
              <span className="title-line-1">Unleash The Power</span>
              <span className="title-line-2">
                To Ride{" "}
                <span className="typewriter-wrapper">
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
              </span>
            </h1>

            <p className="home-hero-description">
              Proudly powering Sri Lanka’s mobility and manufacturing future
              through innovation, technology, and locally crafted excellence.
            </p>

            <button type="button" className="btn btn-primary home-hero-btn">
              Discover Now
            </button>
          </div>
        </div>
      </div>

      {/* SOCIAL ICONS */}
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
         <a href="#youtube" aria-label="Youtube">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
    </section>
  );
}