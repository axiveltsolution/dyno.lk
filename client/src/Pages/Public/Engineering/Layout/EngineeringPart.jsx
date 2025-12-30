import React, { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import "./EngineeringPart.css";

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

      {/* 6. CTA */}
      <ContactBanner bgImage={heroImage} />
    </div>
  );
}
