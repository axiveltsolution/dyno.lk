import React from "react";
import DisplayContacts_Admin from "./../AdminComponent/Contacts_Admin/DisplayContacts_Admin";
import "./AdminPages.css";

export default function Contacts_AdminPage() {
  return (
    <div className="admin-page-container">
      <div className="admin-pages-header">
        <h1>Inquiries Page</h1>
        <p>See all customer inquiries and details</p>
      </div>
      <div className="admin-list-section" style={{ minHeight: "80vh" }}>
        <DisplayContacts_Admin />
      </div>
    </div>
  );
}
