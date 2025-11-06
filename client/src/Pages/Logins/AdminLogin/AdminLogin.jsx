import React from "react";
import "./AdminLogin.css";
import { LogIn } from "lucide-react";

function AdminLogin() {
  return (
    <div className="admin-login-container">
      <div
        className="admin-login-bg"
        style={{
          backgroundImage:
            "url(https://mdbootstrap.com/img/new/textures/full/171.jpg)",
        }}></div>

      <div className="admin-login-card">
        <img src="" alt="dyno logo" />
        <h2 className="admin-login-title">Admin Login</h2>

        <div className="admin-login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <button className="admin-login-btn">
            <LogIn size={18} style={{ marginRight: "8px" }} />
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
