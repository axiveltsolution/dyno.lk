import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  console.log("Auth middleware called, token:", req.headers.authorization);
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) {
    console.log("Auth failed: Missing token");
    return res.status(401).json({ error: "Missing token" });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Auth succeeded, user:", data);
    req.user = data;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
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
