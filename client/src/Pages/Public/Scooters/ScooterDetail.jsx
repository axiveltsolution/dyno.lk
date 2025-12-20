import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Gauge, Zap, Weight, Settings } from "lucide-react";
import "./ScooterDetail.css";

// Components
import SubHero from "../../../Components/SubHero/SubHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";

// Mock Data with Lorem Picsum Images
const scooterData = {
  1: {
    name: "Arena 125",
    subtitle: "The Urban Dominator",
    images: [
      "https://picsum.photos/800/600?random=101",
      "https://picsum.photos/800/600?random=102",
      "https://picsum.photos/800/600?random=103",
    ],
    specs: {
      ENGINE: {
        Type: "Single cylinder, 4-stroke, EURO 4 EFI",
        Displacement: "124.6cc",
        "Max Power": "5.6kW @ 7500 RPM",
        "Fuel System": "Electronic Fuel Injection",
        Cooling: "Air Cooled",
        Starting: "Electric / Kick",
      },
      CHASSIS: {
        Dimensions: "1850 × 860 × 1270 mm",
        "Brakes (F/R)": "Disk / Drum",
        Tyres: "100/80-12 (Tubeless)",
        "Fuel Capacity": "6 L",
        Weight: "108 kg",
      },
    },
  },
  2: {
    name: "Elvissa",
    subtitle: "Electric Elegance",
    images: [
      "https://picsum.photos/800/600?random=201",
      "https://picsum.photos/800/600?random=202",
    ],
    specs: {
      BATTERY: {
        Type: "Lithium Ion",
        Capacity: "60V 26Ah",
        Range: "70 km",
        "Charging Time": "6 Hours",
        "Motor Power": "2000W",
      },
      PERFORMANCE: {
        "Max Speed": "60 km/h",
        Climbing: "15° Gradient",
        "Load Capacity": "150 kg",
      },
    },
  },
  3: {
    name: "Scooby",
    subtitle: "Everyday Reliability",
    images: [
      "https://picsum.photos/800/600?random=301",
      "https://picsum.photos/800/600?random=302",
      "https://picsum.photos/800/600?random=303",
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
  4: {
    name: "Vortex",
    subtitle: "Adventure Ready",
    images: [
      "https://picsum.photos/800/600?random=401",
      "https://picsum.photos/800/600?random=402",
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
  5: {
    name: "Yage 125",
    subtitle: "Compact Efficiency",
    images: [
      "https://picsum.photos/800/600?random=501",
      "https://picsum.photos/800/600?random=502",
    ],
    specs: {
      ENGINE: {
        Type: "Air Cooled EFI",
        Displacement: "124.6cc",
        Efficiency: "High MPG Map",
      },
      CHASSIS: {
        Dimensions: "1800 × 685 × 1190 mm",
        Tyres: "3.50-10",
        Weight: "90 kg (Lightweight)",
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
