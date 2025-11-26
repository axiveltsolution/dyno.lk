// src/routes/careerRoutes.js
import { Router } from "express";
import {
  listCareersPublic,
  listCareersAdmin,
  createCareer,
  updateCareer,
  deleteCareer,
  hardDeleteCareer,
  restoreCareer
} from "../controllers/careerController.js";

import { auth, requireAdmin } from "../middleware/auth.js";
import { uploadCareerImage } from "../middleware/upload.js";

const router = Router();

/* Public */
router.get("/", listCareersPublic);

/* Admin */
const admin = Router();
admin.use(auth, requireAdmin);

// create (image file field name: image)
admin.post("/", uploadCareerImage.single("image"), createCareer);

// update (image optional)
admin.put("/:id", uploadCareerImage.single("image"), updateCareer);

// soft-delete
admin.delete("/:id", deleteCareer);

// hard-delete (permanently removes record and image file)
admin.delete("/:id/hard", hardDeleteCareer);

// restore
admin.post("/:id/restore", restoreCareer);

// admin listing
admin.get("/", listCareersAdmin);

router.use("/admin", admin);

export default router;
