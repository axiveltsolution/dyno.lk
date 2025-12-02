import React from "react";
import DisplayCareer from "../AdminComponent/Career_Admin/DisplayCareer_Admin";
import CareerForm from "../AdminComponent/Career_Admin/CareerForm_Admin";

import { useState } from "react";

export default function Career_AdminPage() {
  // 1. DEFINE STATE HERE
  // This holds the data of the career we are currently editing
  const [editingItem, setEditingItem] = useState(null);

  // This is a trick to reload the table automatically after we save
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // 2. DEFINE SUCCESS HANDLER
  const handleSuccess = () => {
    setEditingItem(null); // Clear the form (go back to Add mode)
    setRefreshTrigger((prev) => prev + 1); // Tell the table to re-fetch data
  };
  return (
    <div className="admin-careers-page">
      <h1>Career Opportunities</h1>
      <CareerForm
        initial={editingItem} // Pass the state down
        onSuccess={handleSuccess}
        onCancel={() => setEditingItem(null)}
      />
      <DisplayCareer
        // Pass the trigger so it knows when to reload
        refreshTrigger={refreshTrigger}
        // When user clicks Edit in table, update OUR state here
        onEdit={(item) => {
          setEditingItem(item);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
}
