// src/components/AdminLayout.jsx
import * as React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
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
} from "lucide-react";

// IMPORT PAGES /////////////////////////////////////
import AdminHome from "./../AdminPages/AdminHome";
import AdminUsers from "../AdminPages/AdminUsers";
import AdminContacts from "../AdminPages/AdminContacts";
import AdminSpareParts from "../AdminPages/AdminSpareParts";

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
              // ABSOLUTE URL
              to={`/admin/${p.path}`}
              className={`admin-nav-item ${
                location.pathname === `/admin/${p.path}` ? "active" : ""
              } ${open ? "open" : ""}`}
              onClick={() => window.innerWidth <= 768 && setOpen(false)}>
              <span className="admin-icon">{p.icon}</span>
              <span className="admin-label main-adnim-lable">{p.name}</span>
            </Link>
          ))}
          <div className="admin-nav-divider" />
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
    </div>
  );
}
