import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Gauge, Zap, Weight, Settings } from "lucide-react";
import "./Scooters-ScooterDetails.css";

// Components
import SubHero from "../../../Components/SubHero/SubHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Mock Data with Lorem Picsum Images
const scooterData = {
  1: {
    name: "Scooby",
    subtitle: "Everyday Reliability",
    images: [
      "/src/assets/Scooters/scooby_front.jpg",
      "/src/assets/Scooters/scooby_side.jpg",
      "/src/assets/Scooters/scooby_back.jpg",
    ],
    specs: {
      ENGINE: {
        Type: "4-stroke, Air cooled, EURO 4",
        Displacement: "124.6cc",
        "Max Torque": "7.3Nm @ 6000 RPM",
        Transmission: "CVT Automatic",
      },
      CHASSIS: {
        "Ground Clearance": "150 mm",
        "Suspension (F)": "Telescopic Fork",
        "Suspension (R)": "Double Shock",
        Brakes: "Disc / Drum",
      },
    },
  },
  2: {
    name: "DRV",
    subtitle: "Urban Performance",
    images: [
      "/src/assets/Scooters/drv-front.jpg",
      "/src/assets/Scooters/drv-side.jpg",
      "/src/assets/Scooters/drv-back.jpg",
    ],
    specs: {
      ENGINE: {
        Type: "Single cylinder, 4-stroke, air-cooled",
        Displacement: "124.6cc",
        "Max Power": "8.5 HP @ 8000 RPM",
        "Max Torque": "9.5 Nm @ 6500 RPM",
        "Fuel System": "Carburetor",
        Cooling: "Air Cooled",
        Starting: "Electric / Kick",
      },
      CHASSIS: {
        Dimensions: "1850 × 690 × 1120 mm",
        "Brakes (F/R)": "Disc / Drum",
        Tyres: "90/90-12 (Tubeless)",
        "Fuel Capacity": "4.5 L",
        Weight: "110 kg",
      },
    },
  },
  3: {
    name: "Votex 125",
    subtitle: "Adventure Ready",
    images: [
      "/src/assets/Scooters/vortex-front.png",
      "/src/assets/Scooters/vortex-side.png",
      "/src/assets/Scooters/vortex-back.png",
    ],
    specs: {
      ENGINE: {
        Type: "Liquid Cooled, 4-stroke",
        Displacement: "124.6cc",
        "Max Power": "High Output Tune",
        Ignition: "ECU Controlled",
      },
      CHASSIS: {
        "Wheel Size": "14 inch Alloy",
        Brakes: "Dual Disc (F/R)",
        "Seat Height": "750mm",
        Weight: "129 kg",
      },
    },
  },
};

export default function ScooterDetail() {
  const { id } = useParams();
  const scooter = scooterData[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  // Auto-rotate images
  useEffect(() => {
    if (!scooter || scooter.images.length <= 1) return;

    const interval = setInterval(() => {
      setImageOpacity(0); // Fade out
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % scooter.images.length);
        setImageOpacity(1); // Fade in
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [scooter]);

  if (!scooter)
    return <div className="scooter-not-found">Scooter Not Found</div>;

  return (
    <div className="dyno-detail-page">
      {/* 1. SUB HERO */}
      <SubHero
        title={scooter.name}
        subtitle={scooter.subtitle || "Performance & Specifications"}
      />

      <div className="container dyno-detail-container">
        {/* 2. TOP SHOWCASE (Split) */}
        <div className="dyno-detail-showcase">
          {/* Left: Image Viewer */}
          <div className="dyno-detail-image-box">
            <img
              src={scooter.images[currentImageIndex]}
              alt={scooter.name}
              style={{ opacity: imageOpacity }}
              className="dyno-detail-main-img"
            />
            {/* Image Indicators */}
            <div className="dyno-img-indicators">
              {scooter.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`indicator ${
                    idx === currentImageIndex ? "active" : ""
                  }`}></span>
              ))}
            </div>
          </div>

          {/* Right: Key Features (Static High-Level Stats) */}
          <div className="dyno-detail-highlights">
            <h3 className="highlights-title">Model Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-card">
                <Gauge className="hl-icon" />
                <span>High Efficiency EFI</span>
              </div>
              <div className="highlight-card">
                <Zap className="hl-icon" />
                <span>Euro 4 Compliant</span>
              </div>
              <div className="highlight-card">
                <Settings className="hl-icon" />
                <span>14 Local Parts</span>
              </div>
              <div className="highlight-card">
                <Weight className="hl-icon" />
                <span>Optimized Chassis</span>
              </div>
            </div>
            <p className="highlights-desc">
              Designed for the Sri Lankan terrain. Built with a perfect balance
              of power, stability, and fuel economy.
            </p>
          </div>
        </div>

        {/* 3. TECHNICAL SPECS */}
        <div className="dyno-detail-specs">
          <div className="specs-header">
            <h2>
              Technical <span className="text-red">Specifications</span>
            </h2>
            <div className="specs-line"></div>
          </div>

          <div className="specs-wrapper">
            {Object.entries(scooter.specs).map(([category, items]) => (
              <div key={category} className="spec-group">
                <h3 className="spec-group-title">{category}</h3>
                <div className="spec-list">
                  {Object.entries(items).map(([key, value]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key}</span>
                      <span className="spec-data">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. CTA */}
      <ContactBanner bgImage={scooter.images[0]} />
    </div>
  );
}
