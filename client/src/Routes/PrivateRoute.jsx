import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../Utils/config";

export default function PrivateRoute({ children }) {
  const isAuthenticated = isTokenValid();

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}
