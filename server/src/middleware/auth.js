import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  // Removed console.log for security - do not log tokens
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) {
    // Removed console.log for security
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    // Removed console.log for security - do not log user data
    req.user = data;
    next();
  } catch (err) {
    console.error("Auth error:", err.message); // Only log error message
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Admin and Superadmin share the same access everywhere
export const requireAdmin = (req, res, next) => {
  if (!req.user || !["admin", "superadmin"].includes(req.user.role)) {
    return res.status(403).json({ error: "Admin only" });
  }
  next();
};

// Equal privileges, as requested
export const requireSuperadmin = requireAdmin;
