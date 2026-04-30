import React, { useState, useEffect, useRef } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Factory, Zap, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./OurFactory.css";
import "../Home/Home.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";

// Local images
import factoryImg from "../../../assets/factorypage-hero/factory-hero.webp";
import pelletsBg from "../../../assets/capabilities/pellets-bg.webp";
import plastic1 from "../../../assets/factory/plastic/plastic1.webp";
import plastic2 from "../../../assets/factory/plastic/plastic2.webp";
import plastic3 from "../../../assets/factory/plastic/plastic3.webp";
import plastic4 from "../../../assets/factory/plastic/plastic4.webp";
import plastic5 from "../../../assets/factory/plastic/plastic5.webp";
import plastic6 from "../../../assets/factory/plastic/plastic6.webp";
import scooter1 from "../../../assets/factory/scooter/scooter1.webp";
import scooter2 from "../../../assets/factory/scooter/scooter2.webp";
import scooter3 from "../../../assets/factory/scooter/scooter3.webp";
import scooter4 from "../../../assets/factory/scooter/scooter4.webp";
import scooter5 from "../../../assets/factory/scooter/scooter5.webp";
import scooter6 from "../../../assets/factory/scooter/scooter6.webp";
import scooter7 from "../../../assets/factory/scooter/scooter7.webp";
import scooter8 from "../../../assets/factory/scooter/scooter8.webp";

// Hero BG
const FACTORY_HERO = factoryImg;
const CTA_BG = pelletsBg;

// --- LOCAL GALLERIES ---
const plasticImages = [
  { src: plastic1, alt: "Plastic Component 1" },
  { src: plastic2, alt: "Plastic Component 2" },
  { src: plastic3, alt: "Plastic Component 3" },
  { src: plastic4, alt: "Plastic Component 4" },
  { src: plastic5, alt: "Plastic Component 5" },
  { src: plastic6, alt: "Plastic Component 6" },
];

const scooterImages = [
  { src: scooter1, alt: "Scooter Assembly 1" },
  { src: scooter2, alt: "Scooter Assembly 2" },
  { src: scooter3, alt: "Scooter Assembly 3" },
  { src: scooter4, alt: "Scooter Assembly 4" },
  { src: scooter5, alt: "Scooter Assembly 5" },
  { src: scooter6, alt: "Scooter Assembly 6" },
  { src: scooter7, alt: "Scooter Assembly 7" },
  { src: scooter8, alt: "Scooter Assembly 8" },
];

export default function OurFactory() {
  const [openPlastic, setOpenPlastic] = useState(false);
  const [plasticIndex, setPlasticIndex] = useState(0);

  const [openScooter, setOpenScooter] = useState(false);
  const [scooterIndex, setScooterIndex] = useState(0);

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
    <div className="dyno-factory-page">
      <CommonHero
        title="Our Factory"
        subtitle="Where Innovation Meets Precision"
        bgImage={FACTORY_HERO}
        parentPage="Company"
      />

      {/* --- SECTION 1: PLASTICS --- */}
      <section className="dyno-factory-section">
        <div className="container">
          <div className="dyno-factory-layout">
            {/* Text Side (Sticky) */}
            <div className="dyno-factory-info sticky">
              <div className="dyno-factory-icon-box">
                <Factory size={32} />
              </div>
              <h2 className="dyno-factory-title">
                Plastic <span className="text-red">Division</span>
              </h2>
              <p className="dyno-factory-desc">
                Our advanced injection moulding facility is the heart of
                component localization. Producing everything from automotive
                body parts to electrical enclosures with micron-level precision.
              </p>
              <ul className="dyno-factory-specs">
                <li>Automated Injection Units</li>
                <li>Automotive Grade Polymers</li>
                <li>In-House Mould Maintenance</li>
              </ul>
            </div>

            {/* Gallery Side */}
            <div className="dyno-factory-gallery">
              {plasticImages.map((img, i) => (
                <div
                  key={i}
                  className="dyno-gallery-item"
                  onClick={() => {
                    setPlasticIndex(i);
                    setOpenPlastic(true);
                  }}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="dyno-gallery-overlay">
                    <span>View Image</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: SCOOTERS (Darker Theme) --- */}
      <section className="dyno-factory-section dark-variant">
        <div className="container">
          <div className="dyno-factory-layout reversed">
            {/* Text Side */}
            <div className="dyno-factory-info sticky">
              <div className="dyno-factory-icon-box red-glow">
                <Zap size={32} />
              </div>
              <h2 className="dyno-factory-title">
                Assembly <span className="text-red">Line</span>
              </h2>
              <p className="dyno-factory-desc">
                The birthplace of the Dyno Scooter. A fully conveyorised
                assembly system where 14 local components meet global
                engineering standards. Every unit undergoes rigorous PDI testing
                before rolling out.
              </p>
              <ul className="dyno-factory-specs">
                <li>Conveyorised Assembly</li>
                <li>Dyno Testing Rig</li>
                <li>ISO 9001 Compliant Process</li>
              </ul>
            </div>

            {/* Gallery Side */}
            <div className="dyno-factory-gallery">
              {scooterImages.map((img, i) => (
                <div
                  key={i}
                  className="dyno-gallery-item"
                  onClick={() => {
                    setScooterIndex(i);
                    setOpenScooter(true);
                  }}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="dyno-gallery-overlay">
                    <span>View Image</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${CTA_BG})` }}>
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">At Your Service, Always</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">Call Us Directly</span>
              <span className="dyno-phone-number">+94 77 033 5088</span>
            </div>
          </div>

          <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
            Contact Us Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Lightboxes */}
      <Lightbox
        open={openPlastic}
        close={() => setOpenPlastic(false)}
        index={plasticIndex}
        slides={plasticImages}
        plugins={[Thumbnails, Zoom]}
      />

      <Lightbox
        open={openScooter}
        close={() => setOpenScooter(false)}
        index={scooterIndex}
        slides={scooterImages}
        plugins={[Thumbnails, Zoom]}
      />
    </div>
  );
}
