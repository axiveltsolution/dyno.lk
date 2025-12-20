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
      to: "/products", // Fallback
      hasDropdown: true,
      items: [
        { label: "Scooters", to: "/scooters" },
        {
          label: "Plastic Products",
          to: "/plastic",
          hasSubmenu: true,
          submenu: [
            { label: "Automotive Parts", to: "/plastic/spares" },
            { label: "Electrical Accessories", to: "/plastic/electrical" },
          ],
        },
        {
          label: "Engineering",
          to: "/engineering",
          hasSubmenu: true,
          submenu: [
            { label: "3D Modelling", to: "/engineering/modelling" },
            { label: "3D Scanning", to: "/engineering/scanning" },
            { label: "3D Printing", to: "/engineering/printing" },
            {
              label: "Reverse Engineering",
              to: "/engineering/reverseengineering",
            },
          ],
        },
      ],
    },
    { to: "/contactus", label: "Contact" },
    { to: "/ourfactory", label: "Factory" },
  ];

  return (
    <header className={`dyno-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container dyno-nav-container">
        {/* LOGO */}
        <Link to="/" className="dyno-logo">
          <img src={DynoLogo} alt="DYNO" />
        </Link>

        {/* DESKTOP MENU */}
        <nav className="dyno-desktop-nav">
          <ul className="dyno-nav-list">
            {navItems.map((item, i) => (
              <li key={i} className="dyno-nav-item">
                {item.hasDropdown ? (
                  // DROPDOWN TRIGGER
                  <div
                    className={`dyno-nav-link ${
                      isActive(item.to) ? "active" : ""
                    }`}>
                    {item.label}
                    <ChevronDown size={14} className="dyno-arrow" />

                    {/* DROPDOWN MENU */}
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

                            {/* SUB-DROPDOWN */}
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
                  // STANDARD LINK
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

        {/* CTA BUTTON (Hidden on Mobile) */}
        <div className="dyno-nav-cta">
          <Link to="/contactus" className="btn btn-primary btn-sm">
            Get Quote
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
          <ul className="dyno-mobile-list">
            {navItems.map((item, i) => (
              <li key={i}>
                {!item.hasDropdown ? (
                  <Link
                    to={item.to}
                    className="dyno-mobile-link"
                    onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                ) : (
                  <details className="dyno-mobile-details">
                    <summary className="dyno-mobile-summary">
                      {item.label} <ChevronDown size={16} />
                    </summary>
                    <ul>
                      {item.items.map((sub, j) => (
                        <li key={j}>
                          <Link
                            to={sub.to}
                            className="dyno-mobile-sublink"
                            onClick={() => setIsOpen(false)}>
                            {sub.label}
                          </Link>
                          {/* Simplified mobile: Flattening sub-sub menus for better UX */}
                          {sub.hasSubmenu &&
                            sub.submenu.map((subsub, k) => (
                              <Link
                                key={k}
                                to={subsub.to}
                                className="dyno-mobile-subsublink"
                                onClick={() => setIsOpen(false)}>
                                - {subsub.label}
                              </Link>
                            ))}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
