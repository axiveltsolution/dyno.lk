// src/middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_ROOT = path.join(__dirname, "..", "..", "uploads");

function ensureFolder(folder) {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
}

const storageFor = (subdir) => {
  const dir = path.join(UPLOADS_ROOT, subdir);
  ensureFolder(dir);

  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, dir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
      const name = `${base}-${Date.now()}${ext}`;
      cb(null, name);
    }
  });
};

export const uploadBikeImage = multer({
  storage: storageFor("bikes"),
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const uploadPartImages = multer({
  storage: storageFor("parts"),
  limits: { fileSize: 8 * 1024 * 1024 }
});

// CORRECT ONE FOR ELECTRICALS
export const uploadElectricalImages = multer({
  storage: storageFor("electricals"),
  limits: { fileSize: 8 * 1024 * 1024 }
});

export const uploadCareerImage = multer({
  storage: storageFor("careers"),
  limits: { fileSize: 6 * 1024 * 1024 }
});