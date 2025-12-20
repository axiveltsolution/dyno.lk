import React from "react";
import "./SubHero.css";

export default function SubHero({ title, subtitle }) {
  return (
    <section className="dyno-subhero">
      {/* Optional: keeps the overlay for extra darkness/texture if needed */}
      <div className="dyno-subhero-overlay"></div>

      <div className="dyno-subhero-content">
        <h1 className="dyno-subhero-title">{title}</h1>
        {subtitle && <p className="dyno-subhero-subtitle">{subtitle}</p>}

        {/* Decorative bottom line */}
        <div className="dyno-subhero-line"></div>
      </div>
    </section>
  );
}
