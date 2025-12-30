import React from "react";
import { Link } from "react-router-dom";
import "./CommonHero.css";

export default function CommonHero({ title, subtitle, bgImage, parentPage }) {
  return (
    <section className="industrial-hero-section">
      {/* 1. BACKGROUND IMAGE (Fixed attachment for natural parallax) */}
      <div
        className="industrial-hero-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* 2. THE HEAVY GRADIENT OVERLAY */}
      <div className="industrial-hero-overlay"></div>

      {/* 3. CONTENT */}
      <div className="container industrial-hero-content">
        <div className="industrial-text-block">
          {/* Breadcrumbs / Subtitle */}
          <div className="industrial-breadcrumbs">
            <Link to="/">Home</Link>
            {parentPage && (
              <>
                <span className="slash">/</span>{" "}
                <span className="parent">{parentPage}</span>
              </>
            )}
            <span className="slash">/</span>
            <span className="current">{title}</span>
          </div>

          {/* Main Title */}
          <h1 className="industrial-hero-title">{title}</h1>

          {/* Optional subtitle below title */}
          {subtitle && <p className="industrial-hero-subtitle">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
