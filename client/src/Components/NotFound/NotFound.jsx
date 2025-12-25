import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="dyno-404-page">
      {/* Background Noise Texture */}
      <div className="noise-overlay"></div>

      <div className="container dyno-404-content">
        {/* The Glitching 404 */}
        <div className="error-code-wrapper">
          <h1 className="glitch-text" data-text="404">
            404
          </h1>
        </div>

        <div className="error-message">
          <AlertTriangle className="error-icon" size={48} />
          <h2>System Malfunction</h2>
          <p>
            The page you are looking for has been moved, disassembled, or does
            not exist in our inventory.
          </p>
        </div>

        <Link to="/" className="btn-return">
          <ArrowLeft size={20} /> Return to Home
        </Link>
      </div>

      {/* The Credit Line */}
      <div className="axivelt-credit">
        <span className="credit-line"></span>
        <p>
          Developed by{" "}
          <a
            href="https://axivelt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="axivelt-link">
            Axivelt Solutions
          </a>
        </p>
      </div>
    </div>
  );
}
