import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

// Import images
import vortexSideImg from "../../../../assets/Scooters/vortex-side.png";
import vortexFrontImg from "../../../../assets/Scooters/vortex-front.png";
import vortexBackImg from "../../../../assets/Scooters/vortex-back.png";

import drvSideImg from "../../../../assets/Scooters/drv-side.jpg";
import drvFrontImg from "../../../../assets/Scooters/drv-front.jpg";
import drvBackImg from "../../../../assets/Scooters/drv-back.jpg";

import scoobySideImg from "../../../../assets/Scooters/scooby_side.jpg";
import scoobyFrontImg from "../../../../assets/Scooters/scooby_front.jpg";
import scoobyBackImg from "../../../../assets/Scooters/scooby_back.jpg";

const models = [
  {
    id: 3,
    name: "Dyno Votex 125 EFI",
    tagline: "Adventure Ready",
    images: [vortexSideImg, vortexFrontImg, vortexBackImg],
    description:
      "High Comfort Family model with Next-Gen Technology, Meeting all your needs.",
    specs: [
      { label: "Suspension", value: "Off-road Tuned" },
      { label: "Lighting", value: "Full LED" },
      { label: "Assembly", value: "Premium Plastic" },
    ],
  },
  {
    id: 2,
    name: "Dyno DRV 125 EFI",
    tagline: "Urban Performance",
    images: [drvSideImg, drvFrontImg, drvBackImg],
    description:
      "A dynamic urban scooter blending style and performance. Compact design with ample storage makes it the ultimate city slicker.",
    specs: [
      { label: "Power", value: "High Torque" },
      { label: "Tech", value: "Digital Dash" },
      { label: "Eco", value: "Fuel Saver" },
    ],
  },
  {
    id: 1,
    name: "Dyno Scooby 125 EFI",
    tagline: "The Family Commuter",
    images: [scoobySideImg, scoobyFrontImg, scoobyBackImg],
    description:
      "Our flagship model. Fully assembled in Sri Lanka with over 40% locally manufactured components. Designed for Strength, Stability, Efficiency, and Daily Family Run.",
    specs: [
      { label: "Engine", value: "125cc EFI" },
      { label: "Brakes", value: "Front Disc ABS" },
      { label: "Warranty", value: "30,000 km" },
    ],
  },
];

const AutoSlider = ({ images, name }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`${name} - view ${idx + 1}`}
          className="scooter-showcase-img"
          style={{
            position: idx === 0 ? "relative" : "absolute",
            top: 0,
            left: 0,
            opacity: currentIndex === idx ? 1 : 0,
            zIndex: currentIndex === idx ? 2 : 1,
            pointerEvents: currentIndex === idx ? "auto" : "none",
            transition: "opacity 1s ease-in-out, transform 0.6s ease"
          }}
        />
      ))}
    </>
  );
};

export default function ScooterModels() {
  const navigate = useNavigate();
  const modelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showcase-in-view");
          }
        });
      },
      { threshold: 0.2 },
    );

    modelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      modelRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="scooter-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="scooter-showcase-header">
          <h4 className="scooter-showcase-subtitle">Our Fleet</h4>
          <h2 className="scooter-showcase-title">
            <span className="text-red">Master</span> The Streets
          </h2>
        </div>

        {/* Models Grid */}
        <div className="scooter-showcase-wrapper">
          {models.map((model, index) => (
            <div
              key={model.id}
              className={`scooter-showcase-card ${
                index % 2 !== 0 ? "layout-flip" : ""
              }`}
              ref={(el) => (modelRefs.current[index] = el)}>
              {/* Image Side */}
              <div className="scooter-showcase-image-box">
                <div className="scooter-glow-effect"></div>
                <div className="scooter-warranty-circle">
                  <span className="warranty-title">Warranty</span>
                  <span className="warranty-line">30,000km or <br />2 years</span>
                  <span className="warranty-note">*conditions apply*</span>
                </div>
                <AutoSlider images={model.images} name={model.name} />
              </div>

              {/* Content Side */}
              <div className="scooter-showcase-content">
                <h4 className="scooter-showcase-tagline">{model.tagline}</h4>
                <h3 className="scooter-showcase-name">{model.name}</h3>
                <p className="scooter-showcase-desc">{model.description}</p>

                <div className="scooter-showcase-btn-group">
                  <button
                    className="btn btn-outline scooter-showcase-btn"
                    onClick={() => navigate(`/scooters/${model.id}`)}>
                    View Specifications
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
