import React, { useEffect, useRef } from "react";
import SectionHero from "../Components/SectionHero";
import "./Engineering.css";

import PrintingImg1 from "../../../assets/engineering_design/3d_printing.jpg";
import PrintingImg2 from "../../../assets/engineering_design/3d_printing2.pg.jpg";
import PrintingImg3 from "../../../assets/engineering_design/3d_printing3.pg.jpg";
import PrintingImg4 from "../../../assets/engineering_design/3d_printing4.pg.jpg";
import PrintingImg5 from "../../../assets/engineering_design/3d_printing5.pg.jpg";
import PrintingImg6 from "../../../assets/engineering_design/3d_printing6.pg.jpg";

export default function Printing() {
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
        bgImage={PrintingImg1}
        title="3D Printing"
        description="Bring Digital Designs to Life"
      />
      <div className="engineering-content">
        <div className="section-container">
          <p className="intro" ref={(el) => (refs.current[0] = el)}>
            <b>Transform digital models into physical prototypes and products with our advanced 3D printing capabilities.</b>
          </p>
        </div>

        <section className="service-section section-container" ref={(el) => (refs.current[1] = el)}>
          <div className="text-content">
            <h2>State-of-the-Art 3D Printing</h2>
            <p>
              Our 3D printing services utilize the latest additive manufacturing technologies
              to create complex, custom parts and prototypes. From rapid prototyping to
              end-use production, we deliver high-quality results that meet your exact
              specifications.
            </p>
            <p>
              With multiple printing technologies and materials at our disposal, we can
              handle projects of any size and complexity, ensuring optimal performance
              and cost-effectiveness.
            </p>
          </div>
          <div className="image-content">
            <img src={PrintingImg1} alt="3D Printing Technology" />
          </div>
        </section>

        <section className="gallery-section section-container" ref={(el) => (refs.current[2] = el)}>
          <h2>Our 3D Printing Gallery</h2>
          <div className="printing-gallery">
            <div className="gallery-item">
              <img src={PrintingImg2} alt="3D Printed Component 1" />
            </div>
            <div className="gallery-item">
              <img src={PrintingImg3} alt="3D Printed Component 2" />
            </div>
            <div className="gallery-item">
              <img src={PrintingImg4} alt="3D Printed Component 3" />
            </div>
            <div className="gallery-item">
              <img src={PrintingImg5} alt="3D Printed Component 4" />
            </div>
            <div className="gallery-item">
              <img src={PrintingImg6} alt="3D Printed Component 5" />
            </div>
          </div>
        </section>

        <section className="benefits-section section-container" ref={(el) => (refs.current[3] = el)}>
          <h2>Key Benefits</h2>
          <ul>
            <li>Rapid prototyping for faster product development</li>
            <li>Complex geometries impossible with traditional manufacturing</li>
            <li>Reduced material waste and production costs</li>
            <li>Customized solutions for unique requirements</li>
            <li>Wide range of materials and finishing options</li>
          </ul>
        </section>
      </div>
    </div>
  );
}