// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import DynoLogo from "../../assets/Logo/Dyno.lk-logo.png";
import "./Footer.css";

/**
 * Flatten NavBar menu → [{ label, to }]
 */
const flattenNavMenu = (navItems) => {
  const flat = [];
  const walk = (items) => {
    items.forEach((item) => {
      if (item.to) flat.push({ label: item.label, to: item.to });
      if (item.submenu) walk(item.submenu);
    });
  };
  walk(navItems);
  return flat;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // === SAME MENU AS NAVBAR (copy-paste) ===
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    {
      label: "Product/Service",
      hasDropdown: true,
      submenu: [
        { label: "Scooters", to: "/scooters" },
        {
          label: "Plastic Products",
          hasDropdown: true,
          submenu: [
            { label: "Automotive Parts", to: "/plastic/automotive" },
            { label: "Electrical Accessories", to: "/plastic/electrical" },
          ],
        },
        {
          label: "Engineering Designs",
          hasDropdown: true,
          submenu: [
            { label: "3D Modelling", to: "/engineering/modelling" },
            { label: "3D Scanning", to: "/engineering/scanning" },
            { label: "3D Printing", to: "/engineering/printing" },
          ],
        },
      ],
    },
    { to: "/contactus", label: "Contact Us" },
    { to: "/testdrive", label: "Our Factory" },
  ];

  // === FLATTEN ALL LINKS ===
  const allLinks = flattenNavMenu(navItems);

  // === SPLIT INTO TWO COLUMNS ===
  const mid = Math.ceil(allLinks.length / 2);
  const column1 = allLinks.slice(0, mid);
  const column2 = allLinks.slice(mid);

  const socialLinks = [
    { icon: faFacebook, url: "https://facebook.com" },
    { icon: faTwitter, url: "https://twitter.com" },
    { icon: faInstagram, url: "https://instagram.com" },
    { icon: faLinkedin, url: "https://linkedin.com" },
  ];

  return (
    <footer className="footer">
      <div className="footer-bg-text">Dyno.lk</div>

      <div className="footer-container">
        <div className="footer-grid">
          {/* LOGO + DESCRIPTION */}
          <div className="footer-logo-section">
            <img src={DynoLogo} alt="Dyno.lk Logo" className="footer-logo" />
            <p className="footer-description">
              Innovating the future, one solution at a time. We're committed to
              delivering exceptional value and transforming ideas into reality.
            </p>
          </div>

          {/* QUICK LINKS – FLEX ROW (TWO COLUMNS) */}
          <div className="footer-quick-menu">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-quick-columns-flex">
              {/* COLUMN 1 */}
              <ul className="footer-quick-column">
                {column1.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* COLUMN 2 */}
              <ul className="footer-quick-column">
                {column2.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CONTACT INFO – WITH EMAIL */}
          <div className="footer-contact">
            <h3 className="footer-section-title">Contact</h3>
            <div className="footer-contact-item">
              <p className="footer-contact-label">Address</p>
              <p className="footer-contact-value">
                No. 376/C High Level Rd,<br />
                Pannipitiya 10230
              </p>
            </div>
            <div className="footer-contact-item">
              <p className="footer-contact-label">Phone</p>
              <a href="tel:0112891666" className="footer-contact-value footer-phone">
                011 289 1666
              </a>
            </div>
            <div className="footer-contact-item">
              <p className="footer-contact-label">Email</p>
              <a href="mailto:info@dyno.lk" className="footer-contact-value footer-email">
                info@dyno.lk
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Dyno.lk. All rights reserved.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;