import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import DynoLogo from "../../assets/Logo/Dyno.lk-logo.jpg";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const siteMap = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog", "Contact"],
    },
    {
      title: "Products",
      links: ["Features", "Solutions", "Pricing", "Documentation", "Resources"],
    },
    {
      title: "Legal",
      links: [
        "Privacy Policy",
        "Terms of Service",
        "Cookie Policy",
        "Security",
      ],
    },
    {
      title: "Support",
      links: ["Help Center", "Status", "API", "Community", "Feedback"],
    },
  ];

  const socialLinks = [
    { icon: faFacebook, url: "#" },
    { icon: faTwitter, url: "#" },
    { icon: faInstagram, url: "#" },
    { icon: faLinkedin, url: "#" },
    { icon: faGithub, url: "#" },
  ];

  return (
    <footer className="footer">
      <div className="footer-bg-text">Dyno.lk</div>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-logo-section">
            <img src={DynoLogo} alt="Company Logo" className="footer-logo" />
            <p className="footer-description">
              "Innovating the future, one solution at a time. We're committed to
              delivering exceptional value and transforming ideas into reality."
            </p>
          </div>

          {siteMap.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="footer-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} TechStartup, Inc. All rights reserved.
          </p>
          <div className="footer-socials">
            {socialLinks.map((social, index) => (
              <a key={index} href={social.url} className="footer-social-link">
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
