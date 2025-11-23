// src/components/AdminLayout.jsx
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
import PopUp from "./../../../Components/PopUp/PopUp";

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
  // 1. FIXED: State starts as false (closed)
  const [open, setOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 2. REMOVED: The useEffect that forced it open on desktop is gone.

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
          open ? "admin-header-open" : "admin-header-closed"
        }`}>
        <h1 className="admin-main-title" style={{ marginBottom: "0" }}>
          Admin
        </h1>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : "closed"}`}>
        <div className={`admin-sidebar-header ${open ? "open" : "closed"}`}>
          <button className="admin-toggle-btn" onClick={() => setOpen(!open)}>
            {open ? <X size={25} /> : <Menu size={25} />}
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
              } ${open ? "open" : ""}`}
              onClick={() => window.innerWidth <= 768 && setOpen(false)}>
              <span className="admin-icon">{p.icon}</span>
              <span className="admin-nav-label main-adnim-lable">{p.name}</span>
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
            <span className=" admin-nav-label main-adnim-lable">Logout</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
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
      {open && (
        <div className="admin-overlay open" onClick={() => setOpen(false)} />
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
