// client/src/Pages/Admin/AdminPages/AdminAddSpareParts.jsx;
import React from "react";
import "./AdminPages.css";

import AdminSparePartsForm from "../AdminComponent/SpareParts_Admin/SparePartsForm_Admin.jsx";
import AdminDisplaySpareParts from "../AdminComponent/SpareParts_Admin/DisplaySpareParts_Admin.jsx";

export default function AddSpareParts() {
  return (
    <div className="admin-add-spareparts-page">
      <AdminSparePartsForm />
      <AdminDisplaySpareParts />
    </div>
  );
}
