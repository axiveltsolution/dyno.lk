import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Bike, Mail, Users } from "lucide-react";
import "./AdminPages.css";

export default function AdminHome() {
  const navigate = useNavigate();

  const cards = [
    { title: "Manage Bikes", icon: <Bike size={28} />, path: "/admin/bikes" },
    {
      title: "Spare Parts",
      icon: <Wrench size={28} />,
      path: "/admin/spare-parts",
    },
    { title: "Contacts", icon: <Mail size={28} />, path: "/admin/contacts" },
    { title: "Admins", icon: <Users size={28} />, path: "/admin/admins" },
  ];

  return (
    <div className="admin-home">
      <h1 className="admin-page-title">Admin Dashboard</h1>

      <div className="admin-card-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            className="admin-card"
            onClick={() => navigate(card.path)}>
            <div className="admin-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
