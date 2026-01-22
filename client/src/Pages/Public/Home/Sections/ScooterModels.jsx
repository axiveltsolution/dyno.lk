import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Home.css";

const models = [
  {
    id: 3,
    name: "Dyno Votex 125 EFI",
    tagline: "Adventure Ready",
    image: "/src/assets/Scooters/vortex-side.png",
    description:
      "High-speed adventure model with vortex technology. Enhanced suspension for rough roads and LED lighting for night rides.",
    specs: [
      { label: "Suspension", value: "Off-road Tuned" },
      { label: "Lighting", value: "Full LED" },
      { label: "Assembly", value: "Premium Plastic" },
    ],
  },
  {
    id: 2,
    name: "Dyno DRV 125 EFI",
    tagline: "Urban Performance",
    image: "/src/assets/Scooters/drv-side.jpg",
    description:
      "A dynamic urban scooter blending style and performance. Compact design with ample storage makes it the ultimate city slicker.",
    specs: [
      { label: "Power", value: "High Torque" },
      { label: "Tech", value: "Digital Dash" },
      { label: "Eco", value: "Fuel Saver" },
    ],
  },
  {
    id: 1,
    name: "Dyno Scooby 125 EFI",
    tagline: "The Family Commuter",
    image: "/src/assets/Scooters/scooby_side.jpg",
    description:
      "Our flagship model. Fully assembled in Sri Lanka with 14 locally manufactured components. Designed for stability, efficiency, and the daily family run.",
    specs: [
      { label: "Engine", value: "125cc EFI" },
      { label: "Brakes", value: "Front Disc ABS" },
      { label: "Warranty", value: "30,000 km" },
    ],
  },
];

export default function ScooterModels() {
  const navigate = useNavigate();
  const modelRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("showcase-in-view");
          }
        });
      },
      { threshold: 0.2 },
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
    <section className="scooter-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="scooter-showcase-header">
          <h4 className="scooter-showcase-subtitle">Our Fleet</h4>
          <h2 className="scooter-showcase-title">
            <span className="text-red">Master</span> The Streets
          </h2>
        </div>

        {/* Models Grid */}
        <div className="scooter-showcase-wrapper">
          {models.map((model, index) => (
            <div
              key={model.id}
              className={`scooter-showcase-card ${
                index % 2 !== 0 ? "layout-flip" : ""
              }`}
              ref={(el) => (modelRefs.current[index] = el)}>
              {/* Image Side */}
              <div className="scooter-showcase-image-box">
                <div className="scooter-glow-effect"></div>
                <img
                  src={model.image}
                  alt={model.name}
                  className="scooter-showcase-img"
                />
              </div>

              {/* Content Side */}
              <div className="scooter-showcase-content">
                <h4 className="scooter-showcase-tagline">{model.tagline}</h4>
                <h3 className="scooter-showcase-name">{model.name}</h3>
                <p className="scooter-showcase-desc">{model.description}</p>

                {/* Spec Grid */}
                <div className="scooter-showcase-specs">
                  {model.specs.map((spec, i) => (
                    <div key={i} className="scooter-spec-item">
                      <span className="scooter-spec-value">{spec.value}</span>
                      <span className="scooter-spec-label">{spec.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-outline scooter-showcase-btn"
                  onClick={() => navigate(`/scooters/${model.id}`)}>
                  View Specifications
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
