import express from 'express';
const router = express.Router();
import {
  addTestEntry,
  getTestsForPatient,
} from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addTestEntry);
router.route('/:patientId').get(protect, getTestsForPatient);

export default router;
