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
import plasticImg from "../../../assets/factory/plastic/plastic1.webp";
import scooterImg from "../../../assets/factory/scooter/scooter1.webp";
import pelletsBg from "../../../assets/capabilities/pellets-bg.webp";
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
              "We proudly empower <span className="text-red">Sri Lanka's</span>{" "}
              mobility future and combine Technological skills with world
              renowned technologies to produce most suitable two-wheelers to
              meet local & international standards. Presently our two-wheelers
              are made with locally produced plastic parts, steel parts, wire
              harness, complete seat, Tyres & Batteries, meeting all local and
              international standards. We are to produce more components of
              Two-Wheelers including Chassis soon. We continuously thriving to
              make “Proudly Made in Sri Lanka” a true reality."
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
                Dyno Innovation (Pvt) Ltd is a fully Sri Lankan owned Company
                redefining local mobility and engineering future. We don’t just
                assemble Two-Wheelers; we engineer products at our modern R&D
                center and manufacture them in our own injection moulding
                facility. We control every step of product life cycle management
                (PLM) process.
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
                  Our Advance injection moulding facility is highly capable of
                  producing automotive parts, electrical equipment and
                  accessories and consumer plastic products. We specialize in
                  Engineering plastic and Consumer plastic products
                  manufacturing. Presently, we are the pioneers in producing
                  automobile plastic parts in Sri Lanka. We produce our own
                  brands and produce OEM products to many customers.
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
                  Our Advanced R&D facility is equipped with industrial type
                  high-end 3D scanning, 3D printing, CAD and FEA software for
                  new product development, Product reverse Engineering and rapid
                  prototyping. "A perfect one stop shop of engineering." We have
                  developed products from concept to end product for many Sri
                  Lankan and overseas clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
