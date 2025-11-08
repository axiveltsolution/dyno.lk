// src/Utils/config.js
import * as jwt_decode from "jwt-decode";

export const getToken = () => localStorage.getItem("adminToken");

export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const now = Date.now() / 1000; // JWT exp is in seconds
    return decoded.exp > now;
  } catch (e) {
    return false; // invalid token format
  }
};
