import React from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Bike, Mail, Users, Zap } from "lucide-react";
import "./AdminPages.css";

export default function AdminHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "All Parts",
      icon: <Wrench size={28} />,
      path: "/admin/all-parts",
    },
    {
      title: "Add Bike",
      icon: <Bike size={28} />,
      path: "/admin/add-bike",
    },
    {
      title: "Add Spare Part",
      icon: <Wrench size={28} />,
      path: "/admin/add-spare-parts",
    },
    {
      title: "Add Electrical",
      icon: <Zap size={28} />,
      path: "/admin/add-electrical",
    },
    {
      title: "Inquiries",
      icon: <Mail size={28} />,
      path: "/admin/inquiry",
    },
    {
      title: "Admins",
      icon: <Users size={28} />,
      path: "/admin/users",
    },
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
