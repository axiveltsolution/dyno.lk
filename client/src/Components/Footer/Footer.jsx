import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import DynoLogo from "../../assets/Logo/Dyno.lk-logo.png";
import "./Footer.css";

// Helper to flatten menu (kept from your original code)
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

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    {
      label: "Product/Service",
      hasDropdown: true,
      submenu: [
        { label: "Scooters", to: "/scooters" },
        { label: "Spare Parts", to: "/spares" },
        { label: "Electrical Accessories", to: "/electricals" },
        { label: "Engineering Designs", to: "/engineering/3d-and-reverse-engineering" },
      ],
    },
    { to: "/contactus", label: "Contact Us" },
    { to: "/testdrive", label: "Our Factory" },
    { to: "/terms", label: "Terms of Service" },
    { to: "/careers", label: "Careers" },
  ];

  const allLinks = flattenNavMenu(navItems);
  const mid = Math.ceil(allLinks.length / 2);
  const column1 = allLinks.slice(0, mid);
  const column2 = allLinks.slice(mid);

  const socialLinks = [
    { icon: <Facebook size={20} />, url: "https://www.facebook.com/Dynoscooters?mibextid=wwXIfr&rdid=qG5i7gg07fb37vpF&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GkqpRHi5W%2F%3Fmibextid%3DwwXIfr#" },
    { icon: <Twitter size={20} />, url: "https://twitter.com" },
    { icon: <Instagram size={20} />, url: "https://www.instagram.com/dynoscooters?igsh=MmU5b2E4M3h0NzV3" },
    { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/company/dyno-innovations/" },
  ];

  return (
    <footer className="dyno-footer">
      {/* BACKGROUND WATERMARK */}
      <div className="dyno-footer-watermark">DYNO.LK</div>

      <div className="container dyno-footer-container">
        <div className="dyno-footer-grid">
          {/* 1. BRAND COLUMN */}
          <div className="dyno-footer-brand">
            <img
              src={DynoLogo}
              alt="Dyno.lk Logo"
              className="dyno-footer-logo"
            />
            <p className="dyno-footer-desc">
              We proudly empower Sri Lanka's mobility future and combine 
              Technological skills with world renowned technologies to produce
              most suitable two-wheelers to meet local & international standards.
              Presently our two-wheelers are made with locally produced 
              plastic parts, steel parts, wire harness, complete seat, Tyres 
              & Batteries, meeting all local and international standards. 
              We are to produce more components of Two-Wheelers including Chassis soon.
              We continuously thriving to make “Proudly Made in Sri Lanka” a 
              true reality.

            </p>
            <div className="dyno-footer-socials">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dyno-social-link">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. LINKS COLUMN (Split into 2 sub-columns) */}
          <div className="dyno-footer-links-wrapper">
            <h3 className="dyno-footer-title">Quick Links</h3>
            <div className="dyno-footer-columns">
              <ul className="dyno-link-list">
                {column1.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="dyno-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="dyno-link-list">
                {column2.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="dyno-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. CONTACT COLUMN */}
          <div className="dyno-footer-contact">
            <h3 className="dyno-footer-title">Contact Us</h3>

            <div className="dyno-contact-item">
              <MapPin className="dyno-contact-icon" size={22} />
              <div>
                <span className="dyno-contact-label">Head Office</span>
                <p className="dyno-contact-text">
                  No. 376C High-level Road Makumbura,
                  <br />
                  Pannipitiya 10230,
                  <br />
                  Sri Lanka.
                </p>
              </div>
            </div>

            <div className="dyno-contact-item">
              <Phone className="dyno-contact-icon" size={22} />
              <div>
                <span className="dyno-contact-label">Phone</span>
                <a href="tel:+94112891666" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">Hotline:</span>
                  <span className="dyno-contact-link-number">+94 11 289 1666</span>
                </a>
                <a href="tel:+94770335088" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">Scooter Sales Hotline:</span>
                  <span className="dyno-contact-link-number">+94 77 033 5088</span>
                </a>
                <a href="tel:+94767899837" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">Spare Parts Hotline:</span>
                  <span className="dyno-contact-link-number">+94 76 789 9837</span>
                </a>
                <a href="tel:+94742855299" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">Scooter Service and Repairs Hotline:</span>
                  <span className="dyno-contact-link-number">+94 74 285 5299</span>
                </a>
                <a href="tel:+94772289069" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">Plastic Products Inquiries Hotline:</span>
                  <span className="dyno-contact-link-number">+94 77 228 9069</span>
                </a>
                <a href="tel:+94768003289" className="dyno-contact-link">
                  <span className="dyno-contact-link-label">CAD and Product Scanning Services:</span>
                  <span className="dyno-contact-link-number">+94 76 800 3289</span>
                </a>
              </div>
            </div>

            <div className="dyno-contact-item">
              <Mail className="dyno-contact-icon" size={22} />
              <div>
                <span className="dyno-contact-label">Email</span>
                <a href="mailto:info@dyno.lk" className="dyno-contact-link">
                  info@dyno.lk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="dyno-footer-bottom">
          <p>
            © {currentYear} Dyno Innovations (Pvt) Ltd. All rights reserved.
          </p>
          <div className="dyno-footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="https://axivelt.com/" target="_blank">
              Developed by Axivelt Solutions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
