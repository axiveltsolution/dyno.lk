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

// IMPORT ICONS ///////////////////////////////////////
import {
  PanelsTopLeft,
  X,
  Home,
  LogOut,
  Users,
  MessageCircleWarning,
  Box,
  Bike,
  Wrench,
} from "lucide-react";

// IMPORT PAGES /////////////////////////////////////
import AdminHome from "./../AdminPages/AdminHome";
import AdminUsers from "../AdminPages/AdminUsers";
import AdminContacts from "../AdminPages/AdminContacts";
import AdminSpareParts from "../AdminPages/AdminSpareParts";
<<<<<<< HEAD
import AddBike from "../AdminPages/AddBike";
import AddSpareParts from "../AdminPages/AddSpareParts";
import PopUp from "../../../Components/PopUp/PopUp.jsx";
=======
import AdminElectricals from "../AdminPages/AdminElectricals";

>>>>>>> vihas3

const pages = [
  {
    name: "Home",
    icon: <Home size={24} />,
    path: "home",
    component: AdminHome,
  },
  {
    name: "Spare Parts",
    icon: <Box size={24} />,
    path: "spare-parts",
    component: AdminSpareParts,
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
  
  {
  name: "Electricals",
  icon: <Box size={24} />,
  path: "electricals",
  component: AdminElectricals
}
];

export default function AdminLayout() {
  const [open, setOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
        <button className="admin-menu-btn" onClick={() => setOpen(true)}>
          <PanelsTopLeft size={25} />
        </button>
        <h1 className="admin-title">Admin</h1>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : "closed"}`}>
        <div className="admin-sidebar-header">
          <button className="admin-close-btn" onClick={() => setOpen(false)}>
            <X size={25} />
          </button>
        </div>

        {/* MENU */}
        <nav className="admin-nav">
          {pages.map((p) => (
            <Link
              key={p.path}
              // ABSOLUTE URL
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
            }}>
            <span className="admin-icon">
              <LogOut size={24} />
            </span>
            <span className="admin-nav-label main-adnim-lable">Logout</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="admin-content">
          <Routes>
            {/* 4. FIXED: Redirect to the relative 'home' path within /admin/ */}
            <Route path="/" element={<Navigate to="home" replace />} />

            {pages.map((p) => {
              const Comp = p.component;
              return (
                <Route
                  key={p.path}
                  // 5. FIXED: Use the simple path segment for nested routing
                  path={p.path}
                  element={<Comp />}
                />
              );
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
