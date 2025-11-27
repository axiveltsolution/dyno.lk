import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import VisualisingImg from "../../../assets/engineering_design/visualising.jpg";

export default function Visualising() {
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
      { threshold: 0.15 }
    );

    refs.current.forEach((ref) => ref && observer.observe(ref));

    return () => refs.current.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  return (
    <div className="engineering-page">
      <SectionHero
        bgImage={VisualisingImg}
        title="Visualising"
        description="Bringing Ideas to Life Through Visualization"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Experience your designs in stunning detail with our advanced visualization services.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>Immersive Visualization</h2>
            <p>
              Our visualization services transform complex technical designs into compelling visual experiences.
              Using cutting-edge rendering software and techniques, we create photorealistic images, animations,
              and interactive presentations that bring your products to life.
            </p>
            <p>
              From concept visualization to marketing materials, our services help you communicate design intent,
              gather feedback, and showcase products effectively to stakeholders and customers.
            </p>
          </div>
          <div className="image-content">
            <img src={VisualisingImg} alt="Visualization Process" />
          </div>
        </section>

        <section className="service-section section-container" ref={(el) => (refs.current[2] = el)}>
          <div className="text-content">
            <h2>Comprehensive Visual Solutions</h2>
            <p>
              Whether you need static renders for presentations, animated sequences for demonstrations, or
              virtual reality experiences for immersive design reviews, our visualization team delivers
              high-quality outputs that meet your specific needs.
            </p>
            <p>
              We work closely with your design and engineering teams to ensure accuracy and fidelity in
              every visualization, helping you make informed decisions and impress your audience.
            </p>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>Photorealistic product visualizations</li>
            <li>Enhanced communication of design concepts</li>
            <li>Improved stakeholder engagement and feedback</li>
            <li>Marketing-ready visual assets</li>
            <li>Integration with our 3D modelling and design services</li>
          </ul>
        </section>
      </div>
    </div>
  );
}