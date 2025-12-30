import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "../Home.css";

// Keep your existing background image path
import PelletsBg from "../../../../assets/capabilities/pellets-bg.jpg";

export default function ContactBanner() {
  const navigate = useNavigate();
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

  return (
    <section
      className="dyno-cta-section"
      ref={bannerRef}
      style={{ backgroundImage: `url(${PelletsBg})` }}>
      {/* Dark Overlay to ensure text readability */}
      <div className="dyno-cta-overlay"></div>

      <div className="container dyno-cta-content">
        <h2 className="dyno-cta-title">Interested In Our Services?</h2>

        <div className="dyno-cta-phone-box">
          <div className="dyno-phone-icon-circle">
            <Phone size={32} />
          </div>
          <div className="dyno-phone-details">
            <span className="dyno-phone-label">Call Us Directly</span>
            <span className="dyno-phone-number">+94 11 289 1485</span>
          </div>
        </div>

        <p className="dyno-cta-text">
          Alternatively, use the form below and we will call you back. Tell us a
          little about the project so we can have the best person call you.
        </p>

        <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
          Contact Us Now <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
