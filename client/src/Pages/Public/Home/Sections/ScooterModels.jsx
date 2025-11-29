import React, { useEffect, useRef } from "react";
import "./ScooterModels.css";

import ScoobyImg from "../../../../assets/Scooters/Scooby125.png";
import DrvImg from "../../../../assets/Scooters/DRV.png";
import VortexImg from "../../../../assets/Scooters/Vortex.png";

const models = [
  {
    id: 1,
    name: "Dyno Scooby 125 EFI",
    image: ScoobyImg,
    description: "Our flagship introductory model, fully assembled in Sri Lanka with 14 locally manufactured components. Ideal for family use with enhanced stability and efficiency.",
    specs: [
      "High-performance 125cc EFI Engine for fuel efficiency",
      "Front Disc Brake with mechanical ABS for safety",
      "Digital meter, electric & kick starter",
      "Longer wheelbase, more luggage space, higher ground clearance",
      "2-year/30,000 km warranty | Colors: Yellow, White, Blue, Red, Black"
    ]
  },
  {
    id: 2,
    name: "Dyno DRV EFI",
    image: DrvImg,
    description: "A dynamic urban scooter blending style and performance, designed for city commuting with local manufacturing excellence.",
    specs: [
      "125cc EFI Engine for smooth power delivery",
      "Advanced braking system with ABS",
      "Compact design with ample storage",
      "Fuel-efficient and eco-friendly",
      "Available in multiple vibrant colors"
    ]
  },
  {
    id: 3,
    name: "Dyno Vortex EFI",
    image: VortexImg,
    description: "High-speed adventure-ready model with superior handling and innovative features for the modern rider.",
    specs: [
      "Powerful 125cc EFI Engine with vortex tech",
      "Dual braking: Disc front, Drum rear",
      "Enhanced suspension for rough roads",
      "LED lighting and digital dashboard",
      "Locally assembled with premium plastics"
    ]
  }
];

export default function ScooterModels() {
  const modelRefs = useRef([]);

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
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    modelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      modelRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section className="scooter-models-section">
      <h1 className="section-main-heading">Our Scooter Models</h1>

      <div className="scooter-models-container">
        {models.map((model, index) => (
          <article
            key={model.id}
            className={`scooter-model-card ${model.id % 2 === 0 ? "reverse" : ""}`}
            ref={(el) => (modelRefs.current[index] = el)}
          >
            <div className="scooter-model-image">
              <img src={model.image} alt={model.name} loading="lazy" />
            </div>

            <div className="scooter-model-details">
              <h2 className="scooter-model-title">{model.name}</h2>
              <p className="scooter-model-desc">{model.description}</p>
              <ul className="scooter-model-specs">
                {model.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
              <button className="btn btn-primary scooter-model-btn">
                Learn More
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}