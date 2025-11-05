// src/routes/contactRoutes.js
import { Router } from "express";
import {
  createContact,
  listContacts,
  getContact,
  markRead,
  deleteContact,
  restoreContact
} from "../controllers/contactController.js";

import { auth, requireAdmin } from "../middleware/auth.js";

const router = Router();

/* Public: submit contact form */
router.post("/", createContact);

/* Admin-protected routes */
const admin = Router();
admin.use(auth, requireAdmin);

admin.get("/", listContacts);               // list (paginated)
admin.get("/:id", getContact);              // get single
admin.patch("/:id/read", markRead);         // mark read/unread
admin.delete("/:id", deleteContact);        // soft-delete
admin.post("/:id/restore", restoreContact); // restore

router.use("/admin", admin);

export default router;
