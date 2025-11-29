import React, { useState } from "react";
import AdminUsersForm from "./../AdminComponent/User_Admin/AdminUsersForm.jsx";
import DisplayUsers_Admin from "./../AdminComponent/User_Admin/DisplayUsers_Admin.jsx";
import "./AdminPages.css";

const Users_AdminPage = () => {
  const [editingItem, setEditingItem] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setEditingItem(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="admin-users-page">
      <h2>Manage Admins</h2>

      <div className="admin-split-layout">
        {/* LEFT: FORM */}
        <div className="admin-form-section">
          <AdminUsersForm
            initial={editingItem}
            onSuccess={handleSuccess}
            onCancel={() => setEditingItem(null)}
          />
        </div>

        {/* RIGHT: LIST */}
        <div className="admin-list-section">
          <DisplayUsers_Admin
            refreshTrigger={refreshTrigger}
            onEdit={(item) => {
              setEditingItem(item);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Users_AdminPage;
