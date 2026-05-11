import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../Home.css";

// Keep your existing background image path
import PelletsBg from "../../../../assets/capabilities/pellets-bg.webp";

export default function ContactBanner() {
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  const hotlines = [
    { name: "Scooter Sales Hotline", number: "+94 77 033 5088" },
    { name: "Spare Parts Hotline", number: "+94 76 789 9837" },
    { name: "Scooter Service and Repairs Hotline", number: "+94 74 285 5299" },
    { name: "Plastic Products Inquiries Hotline", number: "+94 77 228 9069" },
    { name: "CAD and Product Scanning Services Inquiries", number: "+94 76 800 3289" },
  ];

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

  return (
    <section
      className="dyno-cta-section"
      ref={bannerRef}
      style={{ backgroundImage: `url(${PelletsBg})` }}>
      {/* Dark Overlay to ensure text readability */}
      <div className="dyno-cta-overlay"></div>

      <div className="container dyno-cta-content">
        <h2 className="dyno-cta-title">At Your Service, Always</h2>

        <div className="dyno-hotlines-container">
          {hotlines.map((hotline, index) => (
            <a 
              key={index}
              href={`tel:${hotline.number}`}
              className="dyno-hotline-box"
            >
              <div className="dyno-hotline-icon-circle">
                <Phone size={24} />
              </div>
              <div className="dyno-hotline-content">
                <div className="dyno-hotline-number">{hotline.number}</div>
                <span className="dyno-hotline-name">{hotline.name}</span>
              </div>
            </a>
          ))}
        </div>

        <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
          Contact Us Now <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
