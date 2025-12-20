import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { Factory, Zap } from "lucide-react";
import "./OurFactory.css";

// Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Hero BG (Lorem Picsum for Factory)
const FACTORY_HERO = "https://picsum.photos/1920/1080?random=88";
const CTA_BG = "https://picsum.photos/1920/1080?grayscale&random=12";

// --- DUMMY GALLERIES ---
const plasticImages = Array.from({ length: 6 }).map((_, i) => ({
  src: `https://picsum.photos/800/600?random=${100 + i}`,
  alt: `Plastic Component ${i + 1}`,
}));

const scooterImages = Array.from({ length: 6 }).map((_, i) => ({
  src: `https://picsum.photos/800/600?random=${200 + i}`,
  alt: `Scooter Assembly ${i + 1}`,
}));

export default function OurFactory() {
  const [openPlastic, setOpenPlastic] = useState(false);
  const [plasticIndex, setPlasticIndex] = useState(0);

  const [openScooter, setOpenScooter] = useState(false);
  const [scooterIndex, setScooterIndex] = useState(0);

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

      <ContactBanner bgImage={CTA_BG} />

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
