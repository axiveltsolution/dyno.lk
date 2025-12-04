import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import ProductDesigningImg from "../../../assets/engineering_design/productdesigning.jpg";

export default function ProductDesigning() {
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
        bgImage={ProductDesigningImg}
        title="Product Designing"
        description="Innovative Design Solutions for Exceptional Products"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Transform your concepts into market-ready products with our comprehensive product designing services.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>Expert Product Design</h2>
            <p>
              Our product designing team combines creativity, technical expertise, and market insights to develop
              products that not only meet functional requirements but also delight customers. From initial ideation
              to detailed specifications, we guide you through every stage of the design process.
            </p>
            <p>
              Utilizing advanced design software and methodologies, we create designs that are innovative, manufacturable,
              and optimized for performance, cost, and user experience.
            </p>
          </div>
          <div className="image-content">
            <img src={ProductDesigningImg} alt="Product Designing Process" />
          </div>
        </section>

        <section className="service-section section-container" ref={(el) => (refs.current[2] = el)}>
          <div className="text-content">
            <h2>End-to-End Design Services</h2>
            <p>
              Whether you're launching a new product line or redesigning existing offerings, our product designing
              services cover all aspects including industrial design, engineering design, prototyping, and testing.
              We work closely with manufacturers to ensure seamless transition from design to production.
            </p>
            <p>
              Our iterative design approach incorporates user feedback and testing to refine products until they
              achieve perfection, ensuring high success rates in the market.
            </p>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>Innovative and user-centric product designs</li>
            <li>Optimized for manufacturing and cost-efficiency</li>
            <li>Reduced time-to-market with streamlined processes</li>
            <li>Enhanced product functionality and aesthetics</li>
            <li>Integration with our 3D modelling and printing services</li>
          </ul>
        </section>
      </div>
    </div>
  );
}