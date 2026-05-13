import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import "./NavBar.css";
import DynoLogo from "../../assets/Logo/Dyno.lk-logo.png";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Helper: Check if main parent path is active
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    {
      label: "Products",
      to: "/products",
      hasDropdown: true,
      items: [
        { label: "Scooters", to: "/scooters" },
        { label: "Spare Parts", to: "/spares" },
        { label: "Electrical Accessories", to: "/electricals" },
        {
          label: "Engineering",
          to: "",
          hasSubmenu: true,
          submenu: [
            { label: "3D & Reverse Engineering", to: "/engineering/3d-and-reverse-engineering" },
            { label: "3D Scanning", to: "/engineering/scanning" },
            { label: "3D Printing", to: "/engineering/printing" },
          ],
        },
      ],
    },
    { to: "/ourfactory", label: "Factory" },
  ];

  return (
    <header className={`dyno-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container dyno-nav-container">
        {/* LOGO */}
        <Link to="/" className="dyno-logo" onClick={() => setIsOpen(false)}>
          <img src={DynoLogo} alt="DYNO" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="dyno-desktop-nav">
          <ul className="dyno-nav-list">
            {navItems.map((item, i) => (
              <li key={i} className="dyno-nav-item">
                {item.hasDropdown ? (
                  <div
                    className={`dyno-nav-link ${
                      isActive(item.to) ? "active" : ""
                    }`}>
                    {item.label}
                    <ChevronDown size={14} className="dyno-arrow" />

                    {/* MEGA DROPDOWN */}
                    <div className="dyno-dropdown">
                      <ul className="dyno-dropdown-list">
                        {item.items.map((sub, j) => (
                          <li key={j} className="dyno-dropdown-item">
                            <Link to={sub.to} className="dyno-dropdown-link">
                              {sub.label}
                              {sub.hasSubmenu && (
                                <ChevronRight
                                  size={14}
                                  className="dyno-sub-arrow"
                                />
                              )}
                            </Link>

                            {/* SUB-SUB MENU */}
                            {sub.hasSubmenu && (
                              <div className="dyno-sub-dropdown">
                                <ul className="dyno-dropdown-list">
                                  {sub.submenu.map((subsub, k) => (
                                    <li key={k}>
                                      <Link
                                        to={subsub.to}
                                        className="dyno-dropdown-link">
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
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`dyno-nav-link ${
                      isActive(item.to) ? "active" : ""
                    }`}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA BUTTON */}
        <div className="dyno-nav-cta">
          <Link to="/contactus" className="btn btn-primary btn-sm">
            Contact Us
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="dyno-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MOBILE MENU OVERLAY */}
        <div className={`dyno-mobile-menu ${isOpen ? "open" : ""}`}>
          <div className="dyno-mobile-scroll-container">
            <ul className="dyno-mobile-list">
              {navItems.map((item, i) => (
                <li key={i} className="dyno-mobile-item">
                  {!item.hasDropdown ? (
                    <Link to={item.to} className="dyno-mobile-link">
                      {item.label}
                    </Link>
                  ) : (
                    <details className="dyno-mobile-details">
                      <summary className="dyno-mobile-summary">
                        {item.label} <ChevronDown size={18} />
                      </summary>
                      <ul className="dyno-mobile-sublist">
                        {item.items.map((sub, j) => (
                          <li key={j}>
                            {/* If sub has no submenu, standard link */}
                            {!sub.hasSubmenu ? (
                              <Link to={sub.to} className="dyno-mobile-sublink">
                                {sub.label}
                              </Link>
                            ) : (
                              // If sub has submenu, flatten it visually
                              <div className="dyno-mobile-group">
                                <span className="dyno-mobile-grouptitle">
                                  {sub.label}
                                </span>
                                {sub.submenu.map((subsub, k) => (
                                  <Link
                                    key={k}
                                    to={subsub.to}
                                    className="dyno-mobile-subsublink">
                                    {subsub.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </li>
              ))}

              {/* Mobile CTA */}
              <li className="dyno-mobile-cta-item">
                <Link to="/contactus" className="btn btn-primary btn-full">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
