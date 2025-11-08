import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("adminToken");

export const isTokenValid = () => {
  const token = getToken();
  if (!token) {
    console.warn("No token found");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded:", decoded);
    const now = Date.now() / 1000;
    const isValid = decoded.exp > now;
    console.log("Token valid:", isValid);
    return isValid;
  } catch (e) {
    console.error("Invalid token format:", e);
    return false;
  }
};
