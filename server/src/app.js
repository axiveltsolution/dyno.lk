import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS for API
const allowedOrigin = process.env.CORS_ORIGIN;

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// SERVE UPLOADS WITH CORP HEADER (THIS FIXES NotSameOrigin)
const uploadsFolder = path.join(__dirname, "..", "uploads");
app.use(
  "/uploads",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin"); // KEY LINE
    next();
  },
  express.static(uploadsFolder),
);

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

app.use("/api", routes);

// 404
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res
      .status(404)
      .json({ success: false, error: "API route not found" });
  }
  return res.status(404).send("Not Found");
});

// Global error
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

export default app;
