import express from 'express';
const router = express.Router();
import {
  addAdminLogEntry,
  getAdminLogEntries,
} from '../controllers/adminLogController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protect, admin, addAdminLogEntry)
  .get(protect, admin, getAdminLogEntries);

export default router;
