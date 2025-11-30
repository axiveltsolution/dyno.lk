import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import ReverseEngineeringImg from "../../../assets/engineering_design/reverseengineering.jpg";

export default function ReverseEngineering() {
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
        bgImage={ReverseEngineeringImg}
        title="Reverse Engineering"
        description="Unlocking Secrets of Existing Products"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Discover the inner workings of products with our advanced reverse engineering services.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>Comprehensive Reverse Engineering</h2>
            <p>
              Our reverse engineering services allow you to analyze, understand, and replicate existing products
              or components. Using state-of-the-art scanning and analysis techniques, we create accurate digital
              models and specifications from physical objects.
            </p>
            <p>
              This process is invaluable for product improvement, spare parts manufacturing, competitive analysis,
              and bringing legacy products into the digital age.
            </p>
          </div>
          <div className="image-content">
            <img src={ReverseEngineeringImg} alt="Reverse Engineering Process" />
          </div>
        </section>

        <section className="service-section section-container" ref={(el) => (refs.current[2] = el)}>
          <div className="text-content">
            <h2>Advanced Analysis Techniques</h2>
            <p>
              From 3D scanning to material analysis and functional testing, our reverse engineering process
              provides complete insights into product design, materials, and manufacturing methods. We help
              you identify design flaws, optimize performance, and develop improved versions.
            </p>
            <p>
              Our team ensures that all reverse engineered designs are legally compliant and respect intellectual
              property rights, providing you with reliable and actionable data.
            </p>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>Accurate digital recreation of physical products</li>
            <li>Identification of design improvements and optimizations</li>
            <li>Cost-effective spare parts and replacement solutions</li>
            <li>Competitive product analysis and benchmarking</li>
            <li>Seamless integration with our 3D scanning and modelling services</li>
          </ul>
        </section>
      </div>
    </div>
  );
}