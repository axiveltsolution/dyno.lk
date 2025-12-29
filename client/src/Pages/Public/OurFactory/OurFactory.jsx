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

// Local images
import factoryImg from "../../../assets/about/factory.jpg";
import pelletsBg from "../../../assets/capabilities/pellets-bg.jpg";
import plastic1 from "../../../assets/factory/plastic/plastic1.jpg";
import plastic2 from "../../../assets/factory/plastic/plastic2.jpg";
import plastic3 from "../../../assets/factory/plastic/plastic3.jpg";
import plastic4 from "../../../assets/factory/plastic/plastic4.jpg";
import plastic5 from "../../../assets/factory/plastic/plastic5.jpg";
import plastic6 from "../../../assets/factory/plastic/plastic6.jpg";
import scooter1 from "../../../assets/factory/scooter/scooter1.jpg";
import scooter2 from "../../../assets/factory/scooter/scooter2.jpg";
import scooter3 from "../../../assets/factory/scooter/scooter3.jpg";
import scooter4 from "../../../assets/factory/scooter/scooter4.jpg";
import scooter5 from "../../../assets/factory/scooter/scooter5.jpg";
import scooter6 from "../../../assets/factory/scooter/scooter6.jpg";

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
];

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
