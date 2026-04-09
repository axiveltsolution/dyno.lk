import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Gauge, Zap, Weight, Settings, Shield } from "lucide-react";
import "./Scooters-ScooterDetails.css";

// Components
import SubHero from "../../../Components/SubHero/SubHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";
import Scooter360View from "../../../Components/Scooter360View/Scooter360View";

// Import images
import scoobyFrontImg from "../../../assets/Scooters/scooby_front.jpg";
import scoobySideImg from "../../../assets/Scooters/scooby_side.jpg";
import drvBackImg from "../../../assets/Scooters/drv-back.jpg";
import drvFrontImg from "../../../assets/Scooters/drv-front.jpg";
import vortexFrontImg from "../../../assets/Scooters/vortex-front.png";
import vortexBackImg from "../../../assets/Scooters/vortex-back.png";

// Mock Data
const scooterData = {
  1: {
    name: "Scooby 125 EFI",
    subtitle: "Everyday Reliability",
    images: [scoobyFrontImg, scoobySideImg, scoobySideImg],
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
    name: "DRV 125 EFI",
    subtitle: "Urban Performance",
    images: [drvFrontImg, drvBackImg, drvFrontImg],
    use360View: true,
    view360Url: "https://creative-mochi-7d71e6.netlify.app/",
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
    name: "Votex 125 EFI",
    subtitle: "Adventure Ready",
    images: [vortexFrontImg, vortexFrontImg, vortexBackImg],
    use360View: true,
    view360Url: "https://splendorous-empanada-6594c2.netlify.app/",
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
  const navigate = useNavigate();
  const scooter = scooterData[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

  useEffect(() => {
    if (!scooter || scooter.images.length <= 1 || scooter.use360View) return;

    const interval = setInterval(() => {
      setImageOpacity(0);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % scooter.images.length);
        setImageOpacity(1);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, [scooter]);

  if (!scooter)
    return <div className="scooter-not-found">Scooter Not Found</div>;

  return (
    <div className="dyno-detail-page">
      <SubHero
        title={scooter.name}
        subtitle={scooter.subtitle || "Performance & Specifications"}
      />

      <div className="container dyno-detail-container">
        <div className="dyno-detail-showcase">
          <div className="dyno-detail-image-box">
            {scooter.use360View && scooter.view360Url ? (
              <iframe
                src={scooter.view360Url}
                title={`${scooter.name} 360 View`}
                className="dyno-360-iframe"
                frameBorder="0"
                scrolling="no" /* FIX: Removes the side line/scrollbar */
                allowFullScreen
              />
            ) : scooter.use360View ? (
              <Scooter360View images={scooter.images} name={scooter.name} />
            ) : (
              <>
                <img
                  src={scooter.images[currentImageIndex]}
                  alt={scooter.name}
                  style={{ opacity: imageOpacity }}
                  className="dyno-detail-main-img"
                />
              </>
            )}
          </div>

          <div className="dyno-detail-highlights">
            <h3 className="highlights-title">Model Highlights</h3>
            <div className="highlights-grid">
              <div className="highlight-card">
                <Gauge className="hl-icon" />
                <span>High Efficiency EFI</span>
              </div>
              <div className="highlight-card">
                <Zap className="hl-icon" />
                <span>Euro 5 Compliant</span>
              </div>
              <div className="highlight-card">
                <Shield className="hl-icon" />
                <span>30000km / 2 Years Warranty</span>
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
            <button
              className="btn btn-primary scooter-detail-inquiry-btn"
              onClick={() =>
                navigate("/contactus", {
                  state: { inquireModel: scooter.name },
                })
              }>
              Inquiry Now
            </button>
          </div>
        </div>

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

      <ContactBanner bgImage={scooter.images[0]} />
    </div>
  );
}