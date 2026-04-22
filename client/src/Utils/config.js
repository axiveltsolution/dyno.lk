import { jwtDecode } from "jwt-decode";

export const getToken = () => localStorage.getItem("token");

export const isTokenValid = () => {
  const token = getToken();
  if (!token) {
    console.warn("No token found");
    return false;
  }

  try {
    const decoded = jwtDecode(token);
    // Removed console.log for security - do not log decoded token data
    const now = Date.now() / 1000;
    const isValid = decoded.exp > now;
    // Removed console.log for security
    return isValid;
  } catch (e) {
    console.error("Invalid token format:", e.message); // Only log error message, not full error
    return false;
  }
};

// Get API base URL from environment variable or use relative path for production
const getApiBase = () => {
  // Use environment variable if available, otherwise use relative path
  return import.meta.env.VITE_API_BASE || "/api";
};

// Get the base URL for images (without /api suffix)
export const getImageBaseUrl = () => {
  const apiBase = getApiBase();
  // Remove /api suffix if present to get the server base URL
  return apiBase.replace(/\/api$/, "");
};

// Utility function to construct full image URL
// Handles both relative paths and already-complete URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If already a full URL (starts with http:// or https://), return as-is
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // If it's a relative path (starts with /), prepend the image base URL
  if (imagePath.startsWith("/")) {
    return `${getImageBaseUrl()}${imagePath}`;
  }

  // Otherwise, treat as relative path
  return `${getImageBaseUrl()}/${imagePath}`;
};

// API base for fetch calls
export const API_BASE = getApiBase();
