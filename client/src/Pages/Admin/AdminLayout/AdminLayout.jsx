import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./AdminLayout.css";

// IMPORT ICONS
import {
  X,
  Home,
  LogOut,
  Users,
  MessageCircleWarning,
  Box,
  Bike,
  BriefcaseBusiness,
  Wrench,
  Battery,
  Menu,
} from "lucide-react";

// IMPORT PAGES
import AdminHome from "../AdminPages/Home_AdminPage";
import AdminUsers from "../AdminPages/Users_AdminPage";
import AdminContacts from "../AdminPages/Contacts_AdminPage";
import AdminAllParts from "../AdminPages/DisplayAllParts_AdminPage";
import AddBike from "../AdminPages/AddBike_AdminPage";
import AddSpareParts from "../AdminPages/AddSpareParts_AdminPage";
import AdminAddElectrical from "../AdminPages/AddElectrical_AdminPage";
import Career_AdminPage from "../AdminPages/Career_AdminPage";
import PopUp from "./../../../Components/PopUp/PopUp";

import AxiveltLogo from "./../../../assets/axivelt-solutions-software-web-development-company-in-sri-lanka-logo.webp";
import DynoLogo from "./../../../assets/Logo/Dyno.lk-logo.png";
import EmptyProfileImage from "./../../../assets/Admin/empty-profile-image.png";

const pages = [
  {
    name: "Home",
    icon: <Home size={24} />,
    path: "home",
    component: AdminHome,
  },
  {
    name: "All Parts",
    icon: <Box size={24} />,
    path: "all-parts",
    component: AdminAllParts,
  },
  {
    name: "Add Bike",
    icon: <Bike size={24} />,
    path: "add-bike",
    component: AddBike,
  },
  {
    name: "Add Spare Parts",
    icon: <Wrench size={24} />,
    path: "add-spare-parts",
    component: AddSpareParts,
  },
  {
    name: "Add Electrical",
    icon: <Battery size={24} />,
    path: "add-electrical",
    component: AdminAddElectrical,
  },
  {
    name: "Careers",
    icon: <BriefcaseBusiness size={24} />,
    path: "careers",
    component: Career_AdminPage,
  },
  {
    name: "Inquiry",
    icon: <MessageCircleWarning size={24} />,
    path: "inquiry",
    component: AdminContacts,
  },
  {
    name: "Users",
    icon: <Users size={24} />,
    path: "users",
    component: AdminUsers,
  },
];

export default function AdminLayout() {
  const [isOpen, setIsOpen] = React.useState(false); // Renamed for clarity
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [adminName, setAdminName] = React.useState("Admin");

  React.useEffect(() => {
    const storedData = localStorage.getItem("adminUser");
    if (storedData) {
      const parsedUser = JSON.parse(storedData);
      if (parsedUser.name) {
        const firstName = parsedUser.name.split(" ")[0];
        setAdminName(firstName);
      }
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin admin-container">
      {/* TOP BAR */}
      <header
        className={`admin-header ${
          isOpen ? "admin-header-open" : "admin-header-closed"
        }`}>
        <img
          className="admin-db-header-dyno-logo"
          src={DynoLogo}
          alt="dyno.lk logo"
        />
        <div className="admin-header-profile-section">
          <img
            className="admin-db-empty-profile-image"
            src={EmptyProfileImage}
            alt="Empty profile image"
          />
          <div className="admin-header-profile-section-contents">
            <h4
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                margin: "0",
                fontSize: "19px",
                fontWeight: "700",
              }}>
              Admin
            </h4>
            <p
              style={{
                fontSize: "15px",
                marginTop: "-7px",
                fontWeight: "500",
                color: "rgba(255, 255, 255, 0.85)",
              }}>
              {adminName}
            </p>
          </div>
        </div>
      </header>

      {/* SIDEBAR - Renamed classes to sidebar-open / sidebar-closed */}
      <aside
        className={`admin-sidebar ${
          isOpen ? "sidebar-open" : "sidebar-closed"
        }`}>
        <div className="admin-sidebar-header">
          <button
            className="admin-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* MENU */}
        <nav className="admin-nav">
          {pages.map((p) => (
            <Link
              key={p.path}
              to={`/admin/${p.path}`}
              className={`admin-nav-item ${
                location.pathname === `/admin/${p.path}` ? "active" : ""
              } ${isOpen ? "sidebar-open" : ""}`}
              onClick={() => window.innerWidth <= 768 && setIsOpen(false)}>
              <span className="admin-icon">{p.icon}</span>
              <span
                className={`admin-nav-label ${
                  isOpen ? "sidebar-open" : "sidebar-closed"
                }`}>
                {p.name}
              </span>
            </Link>
          ))}
          <div className="admin-nav-divider" />
          <button
            className="admin-nav-item logout-btn"
            onClick={handleLogout}
            style={{
              border: "none",
              background: "transparent",
              width: "100%",
              textAlign: "left",
              fontSize: "16px",
            }}>
            <span className="admin-icon">
              <LogOut size={24} />
            </span>
            <span
              className={`admin-nav-label ${
                isOpen ? "sidebar-open" : "sidebar-closed"
              }`}>
              Logout
            </span>
          </button>
        </nav>

        {/* BOTTOM LOGO */}
        <a
          href="https://axivelt.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-leftbar-axivelt"
          style={{ textDecoration: "none", color: "inherit" }}>
          <div className="axivelt-left-logo">
            <img
              src={AxiveltLogo}
              alt="Axivelt Solutions Logo"
              className="axivelt-logo-db"
            />
          </div>

          <div
            className={`axivelt-right-content ${
              isOpen ? "sidebar-open" : "sidebar-closed"
            }`}>
            <h4 style={{ fontSize: "14px", margin: 0 }}>Axivelt Solutions</h4>
            <p style={{ fontSize: "11px", margin: 0, color: "#666" }}>
              axivelt.com
            </p>
          </div>
        </a>
      </aside>

      {/* MAIN CONTENT - Renamed classes */}
      <main
        className={`admin-main ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="home" replace />} />
            {pages.map((p) => {
              const Comp = p.component;
              return <Route key={p.path} path={p.path} element={<Comp />} />;
            })}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </main>

      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="admin-overlay sidebar-open"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* LOGOUT MODAL */}
      <PopUp
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
      />
    </div>
  );
}
