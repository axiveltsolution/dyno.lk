import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Gauge, Zap, Weight, Settings, Shield, Phone, ArrowRight,
  Thermometer, CircleDot, Activity, Sun, Navigation, Key, 
  Disc, Usb, Package, Fuel, Maximize, Wind, Battery, Layers
} from "lucide-react";
import "./Scooters-ScooterDetails.css";
import "../Home/Home.css";

// Components
import SubHero from "../../../Components/SubHero/SubHero";
import Scooter360View from "../../../Components/Scooter360View/Scooter360View";
import Custom360View from "../../../Components/Custom360View/Custom360View";

// Import images
import scoobyFrontImg from "../../../assets/Scooters/scooby_front.jpg";
import scoobySideImg from "../../../assets/Scooters/scooby_side.jpg";
import drvBackImg from "../../../assets/Scooters/drv-back.jpg";
import drvFrontImg from "../../../assets/Scooters/drv-front.jpg";
import vortexFrontImg from "../../../assets/Scooters/vortex-front.png";
import vortexBackImg from "../../../assets/Scooters/vortex-back.png";
import PelletsBg from "../../../assets/capabilities/pellets-bg.jpg";

// Import 360 images for Vortex
import vortex360_0 from "../../../assets/360/votex125/0_0.webp";
import vortex360_1 from "../../../assets/360/votex125/0_1.webp";
import vortex360_2 from "../../../assets/360/votex125/0_2.webp";
import vortex360_3 from "../../../assets/360/votex125/0_3.webp";
import vortex360_4 from "../../../assets/360/votex125/0_4.webp";
import vortex360_5 from "../../../assets/360/votex125/0_5.webp";
import vortex360_6 from "../../../assets/360/votex125/0_6.webp";
import vortex360_7 from "../../../assets/360/votex125/0_7.webp";
import vortex360_8 from "../../../assets/360/votex125/0_8.webp";
import vortex360_9 from "../../../assets/360/votex125/0_9.webp";
import vortex360_10 from "../../../assets/360/votex125/0_10.webp";
import vortex360_11 from "../../../assets/360/votex125/0_11.webp";
import vortex360_12 from "../../../assets/360/votex125/0_12.webp";
import vortex360_13 from "../../../assets/360/votex125/0_13.webp";
import vortex360_14 from "../../../assets/360/votex125/0_14.webp";
import vortex360_15 from "../../../assets/360/votex125/0_15.webp";
import vortex360_16 from "../../../assets/360/votex125/0_16.webp";
import vortex360_17 from "../../../assets/360/votex125/0_17.webp";
import vortex360_18 from "../../../assets/360/votex125/0_18.webp";

// Import 360 images for DRV
import drv360_0 from "../../../assets/360/drv125/0_0.webp";
import drv360_1 from "../../../assets/360/drv125/0_1.webp";
import drv360_2 from "../../../assets/360/drv125/0_2.webp";
import drv360_3 from "../../../assets/360/drv125/0_3.webp";
import drv360_4 from "../../../assets/360/drv125/0_4.webp";
import drv360_5 from "../../../assets/360/drv125/0_5.webp";
import drv360_6 from "../../../assets/360/drv125/0_6.webp";
import drv360_7 from "../../../assets/360/drv125/0_7.webp";
import drv360_8 from "../../../assets/360/drv125/0_8.webp";
import drv360_9 from "../../../assets/360/drv125/0_9.webp";
import drv360_10 from "../../../assets/360/drv125/0_10.webp";
import drv360_11 from "../../../assets/360/drv125/0_11.webp";
import drv360_12 from "../../../assets/360/drv125/0_12.webp";
import drv360_13 from "../../../assets/360/drv125/0_13.webp";
import drv360_14 from "../../../assets/360/drv125/0_14.webp";
import drv360_15 from "../../../assets/360/drv125/0_15.webp";

// Import 360 images for Scooby
import scooby360_0 from "../../../assets/360/scooby/0_0.webp";
import scooby360_1 from "../../../assets/360/scooby/0_1.webp";
import scooby360_2 from "../../../assets/360/scooby/0_2.webp";

// Mock Data
const scooterData = {
  1: {
    name: "Scooby 125 EFI",
    subtitle: "Everyday Reliability",
    images: [scoobyFrontImg, scoobySideImg, scoobySideImg],
    use360View: true,
    images360: [
      scooby360_0, scooby360_1, scooby360_2
    ],
    features: [
      { icon: Shield, text: "30000km / 2 Years Warranty" },
      { icon: Gauge, text: "High Efficiency EFI" },
      { icon: Zap, text: "Euro 5 Compliant" },
      { icon: Settings, text: "14 Local Parts" },
      { icon: Weight, text: "Optimized Chassis" }
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
    name: "DYNO DRV 125 EFi 2025",
    price: "Rs.695,000.00 with VAT",
    subtitle: "Urban Performance",
    images: [drvFrontImg, drvBackImg, drvFrontImg],
    use360View: true,
    images360: [
      drv360_0, drv360_1, drv360_2, drv360_3,
      drv360_4, drv360_5, drv360_6, drv360_7,
      drv360_8, drv360_9, drv360_10, drv360_11,
      drv360_12, drv360_13, drv360_14, drv360_15
    ],
    features: [
      { icon: Wind, text: "125 EFI Air Cool" },
      { icon: Disc, text: "Front 12 inch, rear 10-inch Alloy wheels" },
      { icon: Gauge, text: "Latest Hi-tech meter with voltage indicator and RPM" },
      { icon: Sun, text: "All LED lights with DRL" },
      { icon: Navigation, text: "Self-aided handlebar for better handling" },
      { icon: Disc, text: "Front and rear Disk breaks" },
      { icon: Usb, text: "USB type C and type A" },
      { icon: Activity, text: "Rear single Suspension" },
      { icon: Fuel, text: "Fuel efficiency 40km/L (7L Fuel Tank)" },
      { icon: Package, text: "Decent luggage space with additional cubby hole" },
      { icon: Layers, text: "Rear Aluminum alloy luggage rack with provision for additional seat" },
      { icon: Battery, text: "Battery: 7A/12V" },
      { icon: Shield, text: "Front wind shield visor" }
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
    name: "DYNO Vortex 125 EFi 2025",
    price: "Rs.1,090,000.00 with VAT",
    subtitle: "Adventure Ready",
    images: [vortexFrontImg, vortexFrontImg, vortexBackImg],
    use360View: true,
    images360: [
      vortex360_0, vortex360_1, vortex360_2, vortex360_3,
      vortex360_4, vortex360_5, vortex360_6, vortex360_7,
      vortex360_8, vortex360_9, vortex360_10, vortex360_11,
      vortex360_12, vortex360_13, vortex360_14, vortex360_15, 
      vortex360_16, vortex360_17, vortex360_18
    ],
    features: [
      { icon: Thermometer, text: "125 EFI Liquid cool" },
      { icon: CircleDot, text: "Front 14-inch, Rear 14-inch Alloy wheels" },
      { icon: Activity, text: "Hi-tech racing type digital meter with voltage and Engine temperature indicator" },
      { icon: Sun, text: "All LED lights with DRL" },
      { icon: Navigation, text: "Self-aided handlebar for better handling" },
      { icon: Key, text: "Smart Key (Keyless Entry)" },
      { icon: Disc, text: "Front and rear Disk breaks" },
      { icon: Usb, text: "USB" },
      { icon: Package, text: "Larger Luggage space including front Cubby hole" },
      { icon: Fuel, text: "Outside Fuel Cap" },
      { icon: Shield, text: "Front wind shield visor" }
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
  const navigate = useNavigate();
  const scooter = scooterData[id];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageOpacity, setImageOpacity] = useState(1);

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
            {scooter.use360View && scooter.images360 ? (
              <Custom360View images={scooter.images360} />
            ) : scooter.use360View && scooter.view360Url ? (
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
            {scooter.price && (
              <div className="scooter-price-tag">
                {scooter.price}
              </div>
            )}
            
            <h3 className="highlights-title">Special Features</h3>

            <div className="highlights-grid">
              {scooter.features && scooter.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="highlight-card">
                    <Icon className="hl-icon" />
                    <span>{feature.text}</span>
                  </div>
                );
              })}
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

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${PelletsBg})` }}>
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">Best person to call you</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">Call Us Directly</span>
              <span className="dyno-phone-number">+94 11 289 1666</span>
            </div>
          </div>

          <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
            Contact Us Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}