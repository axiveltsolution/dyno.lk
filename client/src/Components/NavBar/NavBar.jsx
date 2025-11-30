// src/components/NavBar/NavBar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import DynoLogo from "../../assets/Logo/Dyno.lk-logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to check active route
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    {
      label: "Product/Service",
      hasDropdown: true,
      items: [
        { label: "Scooters", to: "/scooters" },
        {
          label: "Plastic Products",
          to: "/plastic", // ← Now clickable parent page
          hasSubmenu: true,
          submenu: [
            { label: "Automotive Parts", to: "/plastic/spares" },
            { label: "Electrical Accessories", to: "/plastic/electrical" },
          ],
        },
        {
          label: "Engineering Designs",
          to: "/engineering", // ← Now clickable parent page
          hasSubmenu: true,
          submenu: [
            { label: "3D Modelling", to: "/engineering/modelling" },
            { label: "3D Scanning", to: "/engineering/scanning" },
            { label: "3D Printing", to: "/engineering/printing" },
            { label: "Product Designing", to: "/engineering/productdesigning" },
            {
              label: "Reverse Engineering",
              to: "/engineering/reverseengineering",
            },
            { label: "Visualising", to: "/engineering/visualising" },
          ],
        },
      ],
    },
    { to: "/contactus", label: "Contact Us" },
    { to: "/ourfactory", label: "Our Factory" },
  ];

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <nav className="nav-container">
        <Link to="/" className="logo">
          <img src={DynoLogo} alt="DYNO" />
        </Link>

        <ul className="nav-menu">
          {navItems.map((item, i) => (
            <li key={i} className="nav-item">
              {item.to && !item.hasDropdown ? (
                <Link
                  to={item.to}
                  className={`nav-link ${isActive(item.to) ? "active" : ""}`}>
                  {item.label}
                </Link>
              ) : (
                <>
                  <div
                    className={`dropdown-trigger ${
                      location.pathname.startsWith("/scooters") ||
                      location.pathname.startsWith("/plastic") ||
                      location.pathname.startsWith("/engineering")
                        ? "active"
                        : ""
                    }`}>
                    {item.label}
                    <FontAwesomeIcon icon={faChevronDown} className="arrow" />
                  </div>

                  {/* MAIN DROPDOWN */}
                  {item.hasDropdown && (
                    <div className="main-dropdown">
                      <ul className="dropdown-list">
                        {item.items.map((sub, j) => (
                          <li
                            key={j}
                            className={`dropdown-item ${
                              sub.hasSubmenu ? "has-submenu" : ""
                            }`}>
                            {/* CLICKABLE PARENT LINK */}
                            <Link
                              to={sub.to}
                              className="dropdown-link parent-link">
                              {sub.label}
                              {sub.hasSubmenu && (
                                <FontAwesomeIcon
                                  icon={faChevronRight}
                                  className="sub-arrow"
                                />
                              )}
                            </Link>

                            {/* SUB-DROPDOWN */}
                            {sub.hasSubmenu && (
                              <div className="sub-dropdown">
                                <ul className="sub-list">
                                  {sub.submenu.map((subsub, k) => (
                                    <li key={k}>
                                      <Link to={subsub.to} className="sub-link">
                                        {subsub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu">
          <FontAwesomeIcon icon={faBars} className="open" />
          <FontAwesomeIcon icon={faXmark} className="close" />
        </button>
      </nav>

      {/* Mobile Menu - Updated to support clickable parents */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <button className="close-menu" onClick={() => setIsOpen(false)}>
          ×
        </button>
        <ul className="mobile-list">
          {navItems.map((item, i) => (
            <li key={i}>
              {item.to && !item.hasDropdown ? (
                <Link to={item.to} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <details open>
                  <summary>{item.label}</summary>
                  <ul>
                    {item.items.map((sub, j) => (
                      <li key={j}>
                        {sub.to ? (
                          <>
                            <Link
                              to={sub.to}
                              onClick={() =>
                                !sub.hasSubmenu && setIsOpen(false)
                              }>
                              {sub.label} {sub.hasSubmenu && "→"}
                            </Link>
                            {sub.hasSubmenu && (
                              <ul>
                                {sub.submenu.map((subsub, k) => (
                                  <li key={k}>
                                    <Link
                                      to={subsub.to}
                                      onClick={() => setIsOpen(false)}>
                                      {subsub.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
