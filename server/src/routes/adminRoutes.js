import { Router } from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';

import {
  listAdmins, createAdmin, updateAdmin, deleteAdmin
} from '../controllers/adminController.js';

const router = Router();

router.use(auth, requireAdmin);

router.get('/', listAdmins);
router.post('/', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;

