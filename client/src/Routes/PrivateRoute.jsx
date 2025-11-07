// src/components/PrivateRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../Utils/config"; // Assuming getToken is correctly imported

// The component prop accepts the component that needs protection (e.g., AdminLayout)
export default function PrivateRoute({ component: Component, ...rest }) {
  // Check if a valid token exists in localStorage
  const isAuthenticated = !!getToken();

  return (
    // If authenticated, render the Component (e.g., AdminLayout)
    // If NOT authenticated, redirect the user to the admin login page
    isAuthenticated ? (
      // The Component is rendered when the token is present
      <Component {...rest} />
    ) : (
      // Redirect to the login page if no token is found
      <Navigate to="/adminlogin" replace />
    )
  );
}
