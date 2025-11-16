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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            { label: "Automotive Parts", to: "/plastic/spares" },
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "header-scrolled" : ""}`}>
      <nav className="header-container">
        <Link to="/" className="site-logo" onClick={closeMenu}>
          <img src={DynoLogo} alt="DYNO Logo" className="logo-image" />
        </Link>

        {/* DESKTOP MENU */}
        <ul className="header-nav desktop-nav">
          {navItems.map((item, idx) => (
            <li key={idx} className="nav-item-wrapper">
              {item.to ? (
                <Link to={item.to} className="nav-item" onClick={closeMenu}>
                  {item.label}
                </Link>
              ) : (
                <div className="dropdown-trigger">
                  {item.label}
                  {item.hasDropdown && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="dropdown-arrow-main"
                    />
                  )}
                </div>
              )}

              {/* MAIN DROPDOWN */}
              {item.submenu && (
                <ul className="dropdown-menu">
                  {item.submenu.map((subItem, i) => (
                    <li key={i} className="dropdown-item-wrapper">
                      {subItem.to ? (
                        <Link
                          to={subItem.to}
                          className="dropdown-link"
                          onClick={closeMenu}>
                          {subItem.label}
                        </Link>
                      ) : (
                        <>
                          <div className="dropdown-parent-trigger">
                            {subItem.label}
                            {subItem.hasDropdown && (
                              <FontAwesomeIcon
                                icon={faChevronRight}
                                className="dropdown-arrow-sub"
                              />
                            )}
                          </div>
                          <ul className="sub-dropdown-menu">
                            {subItem.submenu.map((subSubItem, j) => (
                              <li key={j}>
                                <Link
                                  to={subSubItem.to}
                                  className="sub-dropdown-link"
                                  onClick={closeMenu}>
                                  {subSubItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE - HAMBURGER/X */}
        <button
          className="mobile-nav-toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}>
          <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
          <FontAwesomeIcon icon={faXmark} className="close-icon" />
        </button>

        {/* MOBILE MENU - FULL OVERLAY */}
        <div className={`mobile-nav-menu ${isOpen ? "menu-open" : ""}`}>
          <ul className="header-nav mobile-nav">
            {navItems.map((item, idx) => (
              <li key={idx}>
                {item.to ? (
                  <Link to={item.to} className="nav-item" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ) : (
                  <details className="mobile-dropdown">
                    <summary className="nav-item">
                      {item.label}
                      {item.hasDropdown && (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="mobile-arrow"
                        />
                      )}
                    </summary>
                    <ul className="mobile-submenu">
                      {item.submenu.map((subItem, i) => (
                        <li key={i}>
                          {subItem.to ? (
                            <Link
                              to={subItem.to}
                              className="nav-item"
                              onClick={closeMenu}>
                              {subItem.label}
                            </Link>
                          ) : (
                            <details className="mobile-sub-dropdown">
                              <summary className="nav-item">
                                {subItem.label}
                                {subItem.hasDropdown && (
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className="mobile-sub-arrow"
                                  />
                                )}
                              </summary>
                              <ul className="mobile-sub-submenu">
                                {subItem.submenu.map((subSubItem, j) => (
                                  <li key={j}>
                                    <Link
                                      to={subSubItem.to}
                                      className="nav-item"
                                      onClick={closeMenu}>
                                      {subSubItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </details>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
