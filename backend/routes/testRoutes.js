import express from 'express';
const router = express.Router();
import {
  addTestEntry,
  getTestsForPatient,
  updateTest,
} from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addTestEntry);
router.route('/:patientId').get(protect, getTestsForPatient);
router.route('/:testId').put(protect, updateTest);

export default router;
