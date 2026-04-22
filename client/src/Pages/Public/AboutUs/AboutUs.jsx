import React, { useEffect, useRef } from "react";
import { CheckCircle2, Factory, Wrench, Cpu } from "lucide-react";
import "./AboutUs.css";

// Shared Components
import CommonHero from "../../../Components/CommonHero/CommonHero";
import ContactBanner from "../../../Components/ContactBanner/ContactBanner";
import storyImg from "../../../assets/aboutus/Ourlegacy.jpeg";
import flagshipImg from "../../../assets/aboutus/flagshipproduct.jpg";
import seatImg from "../../../assets/aboutus/scooterseat.jpg";
import injectionImg from "../../../assets/aboutus/plasticinjection.jpg";
import scanningImg from "../../../assets/aboutus/3dscanning.jpg";
import heroBg from "../../../assets/aboutus/all3scooters.jpg";
import plasticImg from "../../../assets/factory/plastic/plastic1.jpg";
import scooterImg from "../../../assets/factory/scooter/scooter1.jpg";
import pelletsBg from "../../../assets/capabilities/pellets-bg.jpg";
const PelletsBg = pelletsBg;

// Local images for sections
const HERO_BG = heroBg;
const STORY_IMG = storyImg;
const FLAGSHIP_IMG = flagshipImg;
const SEAT_IMG = scooterImg;
const INJECTION_IMG = plasticImg;
const SCANNING_IMG = scanningImg;

export default function AboutUs() {
  const sectionsRef = useRef([]);

  // Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dyno-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
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
    <div className="dyno-about-page">
      {/* 1. HERO SECTION */}
      <CommonHero
        title="Who We Are"
        subtitle="Engineering The Future of Sri Lanka"
        bgImage={HERO_BG}
        parentPage="Company"
      />

      {/* 2. THE MANIFESTO (Intro) */}
      <section className="dyno-manifesto-section" ref={addToRefs}>
        <div className="container">
          <div className="dyno-manifesto-box">
            <h2 className="dyno-manifesto-text">
              "Proudly Empowering <span className="text-red">Sri Lanka's</span>{" "}
              mobility future. We Combine technological skills with world
              renowned technologis to produce most suitable Two-Wheelers to meet
              local & International standard. Presently are Two-Wheelers are
              made with locally produced plastic parts, Steel parts, Wire
              harnesses, Tyres & batteries with thrive to produce more
              Components of Two-Wheelers in a short period."
            </h2>
            <div className="dyno-manifesto-line"></div>
          </div>
        </div>
      </section>

      {/* 3. CINEMATIC SECTIONS (Story & Flagship) */}
      <section className="dyno-about-split-section" ref={addToRefs}>
        <div className="container">
          {/* Row 1: Our Story */}
          <div className="dyno-split-row">
            <div className="dyno-split-content">
              <h4 className="dyno-section-label">Our Legacy</h4>
              <h2 className="dyno-section-heading">The Dyno Story</h2>
              <p className="dyno-text">
                Dyno Innovations (Private) Limited is a full-fledged Sri Lankan
                company redefining local manufacturing. From assembling
                Two-Wheelers to advanced Plastic Injection Moulding, we are
                driving the nation's industrial capabilities forward.
              </p>
            </div>
            <div className="dyno-split-image-box">
              <img src={STORY_IMG} alt="Our Story" className="dyno-split-img" />
            </div>
          </div>

          {/* Row 2: Flagship Product (Reversed) */}
          <div className="dyno-split-row reversed">
            <div className="dyno-split-content">
              <h4 className="dyno-section-label">Flagship Product</h4>
              <h2 className="dyno-section-heading">The Dyno Scooter</h2>
              <p className="dyno-text">
                Fully assembled in Sri Lanka with oever 40% locally manufactured
                components. We produce inhouse injection moulded plastic parts
                to international standards.
              </p>
              <ul className="dyno-check-list">
                <li>
                  <CheckCircle2 size={18} className="check-icon" /> 40%+ Local
                  Components.
                </li>
                <li>
                  <CheckCircle2 size={18} className="check-icon" /> In-house
                  Production and Quality Control.
                </li>
                <li>
                  <CheckCircle2 size={18} className="check-icon" /> Sourced from
                  Top Suppliers.
                </li>
              </ul>
            </div>
            <div className="dyno-split-image-box">
              <img
                src={FLAGSHIP_IMG}
                alt="Flagship Product"
                className="dyno-split-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. INNOVATION GRID (Combines Seat, Plastic, Scanning) */}
      <section className="dyno-innovation-section" ref={addToRefs}>
        <div className="container">
          <div className="dyno-section-header-center">
            <h2 className="dyno-section-heading">Engineering Mastery</h2>
            <p className="dyno-section-subtext">
              We don't just assemble. We engineer, design, and manufacture core
              components in-house.
            </p>
          </div>

          <div className="dyno-bento-grid">
            {/* Card 1: Seat */}
            <div className="dyno-bento-card">
              <div className="dyno-card-img-wrap">
                <img src={SEAT_IMG} alt="Scooter Seat" />
                <div className="card-overlay"></div>
                <Wrench className="card-icon" />
              </div>
              <div className="dyno-card-content">
                <h3>First in Sri Lanka</h3>
                <p>
                  Complete local manufacturing of injection moulded automotive
                  plastic parts.
                </p>
              </div>
            </div>

            {/* Card 2: Plastic Injection */}
            <div className="dyno-bento-card">
              <div className="dyno-card-img-wrap">
                <img src={INJECTION_IMG} alt="Plastic Injection" />
                <div className="card-overlay"></div>
                <Factory className="card-icon" />
              </div>
              <div className="dyno-card-content">
                <h3>Injection Moulding</h3>
                <p>
                  Advanced injection moulding technology, Producing Automotive
                  parts, Electrical Equipment and Accessories and Consumer
                  plastic products.
                </p>
              </div>
            </div>

            {/* Card 3: 3D Scanning */}
            <div className="dyno-bento-card">
              <div className="dyno-card-img-wrap">
                <img src={SCANNING_IMG} alt="3D Scanning" />
                <div className="card-overlay"></div>
                <Cpu className="card-icon" />
              </div>
              <div className="dyno-card-content">
                <h3>R&D Centre</h3>
                <p>
                  Equipped with 3D Scanning, 3D Printing, CAD/CAM, and FEA
                  Simulation for new Product development, Rapid Prototyping and
                  Revice Engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
