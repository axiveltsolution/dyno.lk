// src/utils/files.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// uploads root (project-root/uploads)
export const uploadsRoot = path.join(__dirname, "..", "..", "uploads");

export async function deleteFileIfExists(relPath) {
  // relPath expected like "/uploads/parts/foo.jpg" or "uploads/parts/foo.jpg" or just "parts/foo.jpg"
  if (!relPath) return;
  // normalize to filesystem path under uploadsRoot
  // remove leading slash if present, remove leading "uploads/" if present
  const cleaned = relPath.replace(/^\/?uploads\/?/, "");
  const full = path.join(uploadsRoot, cleaned);
  try {
    await fs.unlink(full);
    //console.log("Deleted file:", full);
    return true;
  } catch (err) {
    // file might not exist; ignore but log optionally
    //console.warn("Could not delete file:", full, err.message);
    return false;
  }
}

export async function deleteFilesIfExists(relPaths = []) {
  const results = [];
  for (const p of relPaths || []) {
    results.push(await deleteFileIfExists(p));
  }
  return results;
}
