import React from "react";
import { Link } from "react-router-dom";
import "./SectionHero.css";

export default function SectionHero({
  bgImage,
  title,
  description,
  buttonText,
  buttonLink,
  darkOverlay = true,
}) {
  return (
    <section className="section-hero">
      <div
        className="hero-common"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}>
        {darkOverlay && <div className="hero-overlay"></div>}

        <div className="hero-common-content">
          <div className="hero-text">
            <h1>{title}</h1>
            <p>{description}</p>

            {buttonText && buttonLink && (
              <Link to={buttonLink} className="btn btn-primary hero-btn">
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
