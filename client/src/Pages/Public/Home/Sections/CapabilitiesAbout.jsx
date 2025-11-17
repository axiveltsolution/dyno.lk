import React, { useEffect, useRef } from "react";
import { 
  Package, 
  Wrench, 
  Droplets, 
  Cpu 
} from "lucide-react";
import "./CapabilitiesAbout.css";

// Replace with your actual factory image
import FactoryImg from "../../../../assets/about/factory.jpg"; // ← Upload your image here

export default function CapabilitiesAbout() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          } else {
            entry.target.classList.remove("animate-in");
          }
        });
      },
      { threshold: 0.2 }
    );

    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const features = [
    {
      icon: <Package size={50} />,
      title: "COMPONENT LOCALIZATION AND SCOOTER ASSEMBLING",
      desc: "Vast range of Scooters named 'Dyno' which have economical and unique features not compromising on performance."
    },
    {
      icon: <Wrench size={50} />,
      title: "MOULD & TOOLING",
      desc: "Our mould makers have years of experience with custom plastic injection mould & tooling."
    },
    {
      icon: <Droplets size={50} />,
      title: "INJECTION MOLDING",
      desc: "Quality-controlled production, experts in a wide variety of capabilities, materials, and sizes."
    },
    {
      icon: <Cpu size={50} />,
      title: "DESIGN & ENGINEERING",
      desc: "In-house design and engineering with professional guidance through every step of the process."
    }
  ];

  return (
    <section className="capabilities-about-section">
      {/* === PART 1: 4 FEATURES === */}
      <div className="capabilities-grid">
        {features.map((feature, i) => (
          <div
            key={i}
            className="capability-card"
            ref={(el) => (refs.current[i] = el)}
          >
            <div className="capability-icon">{feature.icon}</div>
            <h3 className="capability-title">{feature.title}</h3>
            <p className="capability-desc">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* === PART 2: ABOUT US WITH IMAGE === */}
      <div className="about-us-wrapper">
        <div className="about-us-container">
          <div
            className="about-us-image"
            ref={(el) => (refs.current[4] = el)}
          >
            <img src={FactoryImg} alt="Dyno Factory" />
          </div>
          <div
            className="about-us-content"
            ref={(el) => (refs.current[5] = el)}
          >
            <h4 className="about-us-subtitle">About us</h4>
            <h2 className="about-us-title">WHO ARE WE</h2>
            <div className="about-us-underline"></div>
            <p className="about-us-text">
              Dyno Innovations (Private) Limited is a full-fledged Sri Lankan company that has proudly joined hands with the Sri Lankan business directory. Our main objective is to introduce a wide range of products and service with unparalleled quality. Assembling and Production of Two-Wheelers (Scooters), Injection moulding of engineering plastic products and motor vehicle components are our key businesses.
            </p>
            <p className="about-us-text">
              Our Engineering Research and Development Centre (PLM) is equipped with latest high-tech equipment and software for CAE (CAD/CAM) and FEA operation.
            </p>
            <button className="btn about-us-btn">
              MORE ABOUT <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}