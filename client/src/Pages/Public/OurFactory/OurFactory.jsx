// src/pages/OurFactory.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import SectionHero from "../Components/SectionHero";
import HeroFactory from "../../../assets/HomeHero/herobg-1.webp"; // ← Add your hero image

// === ALL 16 IMAGES ===
import plastic1 from "../../../assets/factory/plastic/plastic1.jpg";
import plastic2 from "../../../assets/factory/plastic/plastic2.jpg";
import plastic3 from "../../../assets/factory/plastic/plastic3.jpg";
import plastic4 from "../../../assets/factory/plastic/plastic4.jpg";
import plastic5 from "../../../assets/factory/plastic/plastic5.jpg";
import plastic6 from "../../../assets/factory/plastic/plastic6.jpg";
import plastic7 from "../../../assets/factory/plastic/plastic7.jpg";

import scooter1 from "../../../assets/factory/scooter/scooter1.jpg";
import scooter2 from "../../../assets/factory/scooter/scooter2.jpg";
import scooter3 from "../../../assets/factory/scooter/scooter3.jpg";
import scooter4 from "../../../assets/factory/scooter/scooter4.jpg";
import scooter5 from "../../../assets/factory/scooter/scooter5.jpg";
import scooter6 from "../../../assets/factory/scooter/scooter6.jpg";
import scooter7 from "../../../assets/factory/scooter/scooter7.jpg";
import scooter8 from "../../../assets/factory/scooter/scooter8.jpg";
import scooter9 from "../../../assets/factory/scooter/scooter9.jpg";

import "./OurFactory.css";

const OurFactory = () => {
  const [plasticOpen, setPlasticOpen] = useState(false);
  const [scooterOpen, setScooterOpen] = useState(false);
  const [plasticIndex, setPlasticIndex] = useState(0);
  const [scooterIndex, setScooterIndex] = useState(0);

  const plastics = [plastic1, plastic2, plastic3, plastic4, plastic5, plastic6, plastic7];
  const scooters = [scooter1, scooter2, scooter3, scooter4, scooter5, scooter6, scooter7, scooter8, scooter9];

  const plasticSlides = plastics.map(src => ({ src }));
  const scooterSlides = scooters.map(src => ({ src }));

  // Animation for the CTA section only
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      },
      { threshold: 0.15 }
    );

    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <SectionHero
        bgImage={HeroFactory}
        title="Our Factory"
        description="State-of-the-Art Manufacturing Facility in Sri Lanka"
      />

      {/* PLASTICS SECTION */}
      <section className="factory-section">
        <div className="factory-container">
          <div className="section-header">
            <h2 className="section-title">Plastic Manufacturing Division</h2>
            <div className="title-underline"></div>
            <p className="section-desc">
              Advanced injection molding, precision engineering, and high-quality automotive & electrical plastic components.
            </p>
          </div>
          <div className="gallery-grid">
            {plastics.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => {
                  setPlasticIndex(i);
                  setPlasticOpen(true);
                }}
              >
                <img src={img} alt={`Plastic ${i + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCOOTERS SECTION */}
      <section className="factory-section alt">
        <div className="factory-container">
          <div className="section-header">
            <h2 className="section-title">Electric Scooter Assembly Line</h2>
            <div className="title-underline"></div>
            <p className="section-desc">
              Fully automated assembly with rigorous quality testing – building the future of urban mobility.
            </p>
          </div>
          <div className="gallery-grid">
            {scooters.map((img, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => {
                  setScooterIndex(i);
                  setScooterOpen(true);
                }}
              >
                <img src={img} alt={`Scooter ${i + 1}`} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONLY THE BEAUTIFUL CTA SECTION – EXACT SAME DESIGN AS CAPABILITIES PAGE */}
      <div
        className="interested-cta"
        style={{ backgroundImage: `url(${HeroFactory})` }}
        ref={ctaRef}
      >
        <div className="cta-overlay"></div>
        <div className="cta-content">
          <h2 className="cta-title">INTERESTED IN OUR SERVICES?</h2>
          <div className="cta-phone">
            <span>CALL: +94 112891485</span>
          </div>
          <p className="cta-desc">
            Alternatively use the form below and we will call you back.<br />
            Tell us a little about the project so we can have the best person call you.
          </p>
          <Link to="/contactus" className="cta-btn">
            CONTACT US
          </Link>
        </div>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={plasticOpen}
        close={() => setPlasticOpen(false)}
        index={plasticIndex}
        slides={plasticSlides}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: "bottom", width: 120, height: 80, border: 2, borderRadius: 8, gap: 12 }}
      />
      <Lightbox
        open={scooterOpen}
        close={() => setScooterOpen(false)}
        index={scooterIndex}
        slides={scooterSlides}
        plugins={[Thumbnails, Zoom]}
        thumbnails={{ position: "bottom", width: 120, height: 80, border: 2, borderRadius: 8, gap: 12 }}
      />
    </>
  );
};

export default OurFactory;