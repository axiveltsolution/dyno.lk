// src/components/AdminLayout.jsx
import * as React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import "./AdminLayout.css";

// IMPORT ICONS ///////////////////////////////////////
import { PanelsTopLeft, X, Home, Settings, LogOut, Users } from "lucide-react";

// IMPORT PAGES /////////////////////////////////////
import AdminHome from "./../AdminPages/AdminHome";

const pages = [
  {
    name: "Home",
    icon: <Home size={24} />,
    path: "/admin/home",
    component: AdminHome,
  },
  // Add more later
];

export default function AdminLayout() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

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
              to={p.path}
              className={`admin-nav-item ${
                location.pathname === p.path ? "active" : ""
              } ${open ? "open" : ""}`}
              onClick={() => window.innerWidth <= 768 && setOpen(false)}>
              <span className="admin-icon">{p.icon}</span>
              <span className="admin-label main-adnim-lable">{p.name}</span>
            </Link>
          ))}

          <div className="admin-nav-divider" />

          <Link
            to="/admin/users"
            className={`admin-nav-item ${open ? "open" : ""}`}>
            <span className="admin-icon">
              <Users size={23} />
            </span>
            <span className="admin-label">Users</span>
          </Link>
          <Link
            to="/admin/settings"
            className={`admin-nav-item ${open ? "open" : ""}`}>
            <span className="admin-icon">
              <Settings size={23} />
            </span>
            <span className="admin-label">Settings</span>
          </Link>
          <Link to="/logout" className={`admin-nav-item ${open ? "open" : ""}`}>
            <span className="admin-icon">
              <LogOut size={23} />
            </span>
            <span className="admin-label">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="admin-content">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            {pages.map((p) => {
              const Comp = p.component;
              return (
                <Route
                  key={p.path}
                  path={p.path.replace("/admin", "")}
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
    </div>
  );
}
