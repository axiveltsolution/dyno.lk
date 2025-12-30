import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./ContactBanner.css";

// Default fallback in case no prop is passed
const DEFAULT_BG = "https://picsum.photos/1920/800?random=99";

export default function ContactBanner({ bgImage }) {
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
      // Use the passed prop, or fall back to default
      style={{ backgroundImage: `url(${bgImage || DEFAULT_BG})` }}>
      {/* Dark Overlay */}
      <div className="dyno-cta-overlay"></div>

      <div className="container dyno-cta-content">
        <h2 className="dyno-cta-title">Ready to Start Your Project?</h2>

        <div className="dyno-cta-divider"></div>

        <p className="dyno-cta-text">
          From concept to production, we have the engineering expertise to bring
          your vision to life. Contact our team today for a consultation.
        </p>

        <div className="dyno-cta-row">
          {/* Button */}
          <Link to="/contactus" className="btn btn-primary dyno-cta-btn">
            Contact Us <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
