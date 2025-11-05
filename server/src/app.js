import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('dev'));

// NOTE: increase JSON body size for long TinyMCE content if needed
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploads folder (so images are accessible)
const uploadsFolder = path.join(__dirname, "..", "uploads");
app.use("/uploads", express.static(uploadsFolder));

// CORS
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

// ... rest unchanged
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({ success: false, error: "API route not found" });
  }
  return res.status(404).send("Not Found");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

export default app;
