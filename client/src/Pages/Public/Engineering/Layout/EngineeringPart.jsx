import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import "./EngineeringPart.css";

// Import background image for CTA section
import PelletsBg from "../../../../assets/capabilities/pellets-bg.webp";

// Components
import SubHero from "../../../../Components/SubHero/SubHero.jsx";
import ContactBanner from "../../../../Components/ContactBanner/ContactBanner.jsx";

export default function EngineeringPart({
  title,
  subtitle,
  heroImage,
  introText,
  section1Title,
  section1Text,
  section1Image,
  section2Title,
  section2Text,
  section2Image,
  benefits,
}) {
  const sectionsRef = useRef([]);
  const bannerRef = useRef(null);

  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("eng-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // CTA Banner Animation Observer
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

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="dyno-engineering-page">
      {/* 1. HERO */}
      <SubHero
        title={title}
        subtitle={subtitle}
        // SubHero doesn't strictly need bgImage if using the black CSS,
        // but we can pass it if your SubHero supports it.
      />

      <div className="container dyno-eng-container">
        {/* 2. INTRO */}
        <div className="dyno-eng-intro" ref={addToRefs}>
          <p>{introText}</p>
          <div className="dyno-eng-line"></div>
        </div>

        {/* 3. SECTION 1 (Text Left, Image Right) */}
        <section className="dyno-eng-section" ref={addToRefs}>
          <div className="dyno-eng-content">
            <h2 className="dyno-eng-heading">{section1Title}</h2>
            <div className="dyno-eng-text">{section1Text}</div>
          </div>
          <div className="dyno-eng-image-box">
            <img src={section1Image} alt={section1Title} loading="lazy" />
          </div>
        </section>

        {/* 4. SECTION 2 (Image Left, Text Right) */}
        <section className="dyno-eng-section reversed" ref={addToRefs}>
          <div className="dyno-eng-content">
            <h2 className="dyno-eng-heading">{section2Title}</h2>
            <div className="dyno-eng-text">{section2Text}</div>
          </div>
          <div className="dyno-eng-image-box">
            <img src={section2Image} alt={section2Title} loading="lazy" />
          </div>
        </section>

        {/* 5. BENEFITS GRID */}
        <section className="dyno-eng-benefits" ref={addToRefs}>
          <h2 className="dyno-eng-heading center">Key Benefits</h2>
          <div className="dyno-benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="dyno-benefit-card">
                <CheckCircle2 className="benefit-icon" size={24} />
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        className="dyno-cta-section"
        ref={bannerRef}
        style={{ backgroundImage: `url(${PelletsBg})` }}>
        {/* Dark Overlay to ensure text readability */}
        <div className="dyno-cta-overlay"></div>

        <div className="container dyno-cta-content">
          <h2 className="dyno-cta-title">Engineering Services Inquiry</h2>

          <div className="dyno-cta-phone-box">
            <div className="dyno-phone-icon-circle">
              <Phone size={32} />
            </div>
            <div className="dyno-phone-details">
              <span className="dyno-phone-label">CAD and Product Scanning Services</span>
              <span className="dyno-phone-number">+94 76 800 3289</span>
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
