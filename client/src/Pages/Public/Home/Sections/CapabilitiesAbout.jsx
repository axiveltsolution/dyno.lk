import React, { useEffect, useRef } from "react";
import { Bike, Wrench, Droplets, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../Home.css";
// Keep your existing image import
import FactoryImg from "../../../../assets/aboutus/flagshipproduct.jpg";

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
      icon: <Bike strokeWidth={1.5} />,
      title: "Two-Wheeler Production",
      desc: "Conveyorised assembly systems producing the next generation of Dyno Two-Wheelers with Locally manufactured components.",
    },
    {
      id: 2,
      icon: <Wrench strokeWidth={1.5} />,
      title: "Mould & Tooling",
      desc: "Precision engineering for custom plastic products moulds, designed by expert toolmakers with decades of experience.",
    },
    {
      id: 3,
      icon: <Droplets strokeWidth={1.5} />,
      title: "Injection Molding",
      desc: "Our Advance injection moulding facility is highly capable of producing automotive parts, electrical equipment and accessories and consumer plastic products. We specialize in Engineering plastic and Consumer plastic products manufacturing. Presently, we are the pioneers in producing automobile plastic parts in Sri Lanka. We produce our own brands and produce OEM products to many customers.",
    },
    {
      id: 4,
      icon: <Cpu strokeWidth={1.5} />,
      title: "R&D Centre",
      desc: "Our Advanced R&D facility is equipped with industrial type high-end 3D scanning, 3D printing, CAD and FEA software for new product development, Product reverse Engineering and rapid prototyping. \"A perfect one stop shop of engineering.\" We have developed products from concept to end product for many Sri Lankan and overseas clients.",
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
              <span className="text-red">Premier Manufacturer</span>
            </h2>

            <p className="dyno-factory-text">
              Dyno Innovation (Pvt) Ltd is a fully Sri Lankan owned Company 
              redefining local mobility and engineering future. 
              We don’t just assemble Two-Wheelers; we engineer products 
              at our modern R&D center and manufacture them in our own 
              injection moulding facility. We control every step of product 
              life cycle management (PLM) process. 
            </p>

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
