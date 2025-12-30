import React, { useEffect, useRef } from "react";
import { Package, Wrench, Droplets, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../Home.css";
// Keep your existing image import
import FactoryImg from "../../../../assets/about/factory.jpg";

export default function CapabilitiesAbout() {
  const sectionRef = useRef(null);

  // Simple animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dyno-in-view");
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll(".dyno-animate-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: 1,
      icon: <Package strokeWidth={1.5} />,
      title: "Scooter Assembly",
      desc: "Conveyorised assembly systems producing the next generation of 'Dyno' scooters with 14 localized components.",
    },
    {
      id: 2,
      icon: <Wrench strokeWidth={1.5} />,
      title: "Mould & Tooling",
      desc: "Precision engineering for custom plastic injection moulds, designed by expert toolmakers with decades of experience.",
    },
    {
      id: 3,
      icon: <Droplets strokeWidth={1.5} />,
      title: "Injection Molding",
      desc: "High-capacity production using advanced engineering plastics to create durable, automotive-grade components.",
    },
    {
      id: 4,
      icon: <Cpu strokeWidth={1.5} />,
      title: "R&D Centre",
      desc: "Advanced PLM facility equipped with 3D Scanning, Printing, and CAD/CAM/FEA software for rapid prototyping.",
    },
  ];

  return (
    <section className="dyno-services-section" ref={sectionRef}>
      {/* --- PART 1: SERVICES GRID --- */}
      <div className="container">
        <div className="dyno-services-header dyno-animate-item">
          <h4 className="dyno-services-subtitle">Engineering Excellence</h4>
          <h2 className="dyno-services-title">
            <span className="text-red">Our</span> Capabilities
          </h2>
        </div>

        <div className="dyno-services-grid">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="dyno-service-card dyno-animate-item">
              <div className="dyno-service-icon">{feature.icon}</div>
              <h3 className="dyno-service-card-title">{feature.title}</h3>
              <p className="dyno-service-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- PART 2: THE FACTORY (About Us) --- */}
      <div className="dyno-factory-wrapper">
        <div className="container dyno-factory-container">
          {/* Text Side */}
          <div className="dyno-factory-content dyno-animate-item">
            <h4 className="dyno-services-subtitle">Who We Are</h4>
            <h2 className="dyno-services-title">
              Sri Lanka's <br />
              Premier Manufacturer
            </h2>

            <p className="dyno-factory-text">
              Dyno Innovations is a full-fledged Sri Lankan company redefining
              local mobility. We don't just assemble; we engineer. From our
              state-of-the-art <strong>Injection Moulding</strong> facility to
              our dedicated <strong>R&D Centre (PLM)</strong>, we control every
              step of the quality process.
            </p>

            <div className="dyno-factory-stats">
              <div className="dyno-stat">
                <span className="dyno-stat-num">14+</span>
                <span className="dyno-stat-label">Local Parts</span>
              </div>
              <div className="dyno-stat">
                <span className="dyno-stat-num">100%</span>
                <span className="dyno-stat-label">Lankan Built</span>
              </div>
            </div>

            <Link to="/about" className="btn btn-primary dyno-factory-btn">
              Our Journey <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </Link>
          </div>

          {/* Image Side */}
          <div className="dyno-factory-image-box dyno-animate-item">
            <div className="dyno-img-frame">
              <img
                src={FactoryImg}
                alt="Dyno Factory Floor"
                className="dyno-factory-img"
              />
              <div className="dyno-img-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
