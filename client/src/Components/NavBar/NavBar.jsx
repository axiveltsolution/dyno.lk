import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-header">
      <nav className="sticky-nav">
        <div className="logo"></div>

        <button
          id="nav-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation">
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="2x" />
        </button>
      </nav>

      <div id="takeover-nav" className={menuOpen ? "shown" : ""}>
        <div className="nav-overlay">
          {/* Left Section */}
          <div className="nav-left">
            <h1>
              build your digital <br /> success with us
              <span className="dot">.</span>
            </h1>

            <div className="contact-info">
              <p>+1 386-235-4062</p>
              <p>morgan@tactusmarketing.com</p>
              <p>Aguadilla, PR 00603</p>
            </div>

            <div className="social-links">
              <a href="#">linkedin</a> | <a href="#">facebook</a> |{" "}
              <a href="#">instagram</a>
            </div>
          </div>

          {/* Right Section */}
          <div className="nav-right">
            <ul className="nav-items">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  home
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={() => setMenuOpen(false)}>
                  services
                </Link>
              </li>
              <li>
                <Link to="/portfolio" onClick={() => setMenuOpen(false)}>
                  portfolio
                </Link>
              </li>
              <li>
                <Link to="/contactus" onClick={() => setMenuOpen(false)}>
                  contact
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  about
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
