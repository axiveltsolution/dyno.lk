// src/middleware/upload.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// root uploads directory (project-root/uploads)
const UPLOADS_ROOT = path.join(__dirname, "..", "..", "uploads");

// ensure folder exists
function ensureFolder(folder) {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
}

// storage factory: saves files to uploads/<subdir>
const storageFor = (subdir) => {
  const dir = path.join(UPLOADS_ROOT, subdir);
  ensureFolder(dir);

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // keep original extension, add timestamp
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
      const name = `${base}-${Date.now()}${ext}`;
      cb(null, name);
    }
  });
};

// single image for bike
export const uploadBikeImage = multer({
  storage: storageFor("bikes"),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// multiple images for spare part
export const uploadPartImages = multer({
  storage: storageFor("parts"),
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB each
});
