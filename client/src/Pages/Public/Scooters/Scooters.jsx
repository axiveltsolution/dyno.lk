import React from "react";
import { Link } from "react-router-dom";
import "./Scooters.css";

const scooters = [
  {
    id: 1,
    name: "Dyno Scooter Model A",
    image: "/src/assets/aboutus/scooterseat.jpg",
    excerpt: "A reliable and efficient scooter for everyday commuting."
  },
  {
    id: 2,
    name: "Dyno Scooter Model B",
    image: "/src/assets/aboutus/flagshipproduct.jpg",
    excerpt: "Our flagship model with advanced features and superior performance."
  },
  {
    id: 3,
    name: "Dyno Scooter Model C",
    image: "/src/assets/aboutus/3dscanning.jpg",
    excerpt: "Compact and eco-friendly scooter perfect for urban environments."
  },
];

export default function Scooters() {
  return (
    <div className="scooters container">
      <div className="page-head">
        <h1>Scooters</h1>
        <p className="muted">
          Discover our range of high-quality scooters designed for performance and reliability.
        </p>
      </div>

      <section className="grid scooters-grid">
        {scooters.map((scooter) => (
          <article key={scooter.id} className="card scooter-card">
            <Link to={`/scooters/${scooter.id}`} className="scooter-link">
              <div className="scooter-media">
                <img src={scooter.image} alt={scooter.name} />
              </div>
              <div className="card-body">
                <h3>{scooter.name}</h3>
                <p className="excerpt">{scooter.excerpt}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}