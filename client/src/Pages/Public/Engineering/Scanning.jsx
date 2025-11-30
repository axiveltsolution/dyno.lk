import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import ScanningImg1 from "../../../assets/engineering_design/3d_scanning.jpg";
import ScanningImg2 from "../../../assets/engineering_design/3d_scanning2.jpg";

export default function Scanning() {
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
        bgImage={ScanningImg1}
        title="3D Scanning"
        description="Capture Reality with Precision Technology"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Capture intricate details and complex geometries with our state-of-the-art 3D scanning services.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>Advanced 3D Scanning Technology</h2>
            <p>
              Our 3D scanning services utilize cutting-edge laser and structured light scanning
              technology to create highly accurate digital representations of physical objects.
              From small components to large assemblies, we capture every detail with precision
              and speed.
            </p>
            <p>
              This technology is essential for reverse engineering, quality control, digital
              archiving, and creating accurate CAD models for manufacturing and design purposes.
            </p>
          </div>
          <div className="image-content">
            <img src={ScanningImg1} alt="3D Scanning Equipment" />
          </div>
        </section>

        <section className="service-section section-container" ref={(el) => (refs.current[2] = el)}>
          <div className="image-content">
            <img src={ScanningImg2} alt="3D Scanning Process" />
          </div>
          <div className="text-content">
            <h2>Comprehensive Scanning Solutions</h2>
            <p>
              Whether you need to digitize existing parts for reproduction, inspect components
              for quality assurance, or create digital twins for analysis, our 3D scanning
              services provide the accuracy and detail you need.
            </p>
            <p>
              Our skilled technicians ensure that scans are processed efficiently, resulting
              in clean, usable data that integrates seamlessly with our design and manufacturing
              workflows.
            </p>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>High-accuracy capture of complex geometries</li>
            <li>Non-contact scanning preserves original objects</li>
            <li>Fast processing for reduced project timelines</li>
            <li>Compatible with all major CAD software</li>
            <li>Ideal for reverse engineering and quality inspection</li>
          </ul>
        </section>
      </div>
    </div>
  );
}