import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import { asyncHandler } from "../middleware/async.js";

const makeToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" }); 


export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};


  const SA_EMAIL = (process.env.SUPERADMIN_EMAIL || "").trim();
  const SA_HASH  = (process.env.SUPERADMIN_PASSWORD_HASH || "").trim();
  const SA_PLAIN = (process.env.SUPERADMIN_PASSWORD || "").trim();

  if (SA_EMAIL && email?.toLowerCase() === SA_EMAIL.toLowerCase()) {
    let ok = false;
    if (SA_HASH) ok = await bcrypt.compare(password, SA_HASH);
    else if (SA_PLAIN) ok = SA_PLAIN === password;

    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = makeToken({ role: "superadmin", email: SA_EMAIL });
    return res.json({
      token,
      user: { id: null, name: "Super Admin", role: "superadmin", email: SA_EMAIL }
    });
  }

  
  const user = await AdminUser.findOne({ email, isActive: true });
  if (!user || !(await user.validatePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = makeToken({ id: user._id.toString(), role: "admin", email: user.email });
  res.json({
    token,
    user: { id: user._id, name: user.name, role: "admin", email: user.email }  
  });
});
