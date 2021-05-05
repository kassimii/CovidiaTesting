import express from 'express';
const router = express.Router();
import { addAdminLogEntry } from '../controllers/adminLogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, admin, addAdminLogEntry);

export default router;
