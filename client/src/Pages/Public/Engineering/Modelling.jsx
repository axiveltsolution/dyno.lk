import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import ModellingImg1 from "../../../assets/engineering_design/3d_modeling.jpg";
import ModellingImg2 from "../../../assets/engineering_design/3d_modeling2.jpg";

export default function Modelling() {
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
        bgImage={ModellingImg1}
        title="3D Modelling"
        description="Precision Engineering Through Digital Design"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Transform your ideas into precise digital models with our advanced 3D modelling services.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>Advanced 3D Modelling</h2>
            <p>
              Our 3D modelling services utilize cutting-edge software and hardware to create accurate,
              detailed digital representations of your products and components. From concept to
              prototyping, we ensure every design meets the highest standards of precision and
              functionality.
            </p>
            <p>
              Leveraging CAD/CAM and CAE technologies, our engineering team delivers models that
              are not only visually stunning but also optimized for manufacturing, performance,
              and cost-efficiency.
            </p>
          </div>
          <div className="image-content">
            <img src={ModellingImg1} alt="3D Modelling Process" />
          </div>
        </section>

        <section className="service-section section-container" ref={(el) => (refs.current[2] = el)}>
          <div className="image-content">
            <img src={ModellingImg2} alt="3D Modelling Software" />
          </div>
          <div className="text-content">
            <h2>Comprehensive Design Solutions</h2>
            <p>
              Whether you're developing new products, reverse engineering existing components,
              or optimizing designs for better performance, our 3D modelling expertise covers
              all aspects of digital design. We work closely with clients to understand their
              requirements and deliver solutions that drive innovation and success.
            </p>
            <p>
              Our in-house research and development centre is equipped with the latest tools
              and software, ensuring that your projects are completed efficiently and to the
              highest quality standards.
            </p>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>High-precision digital models for accurate prototyping</li>
            <li>Optimized designs for manufacturing and performance</li>
            <li>Reduced development time and costs</li>
            <li>Enhanced visualization and communication</li>
            <li>Seamless integration with our 3D printing and scanning services</li>
          </ul>
        </section>
      </div>
    </div>
  );
}