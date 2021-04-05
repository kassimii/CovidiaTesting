import express from 'express';
const router = express.Router();
import {
  addTestEntry,
  getTestsForPatient,
  updateTest,
  getTests,
  sendTestPatientPDF,
  getTestsDSP,
} from '../controllers/testController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addTestEntry).get(protect, admin, getTests);
router.route('/dsp').get(protect, admin, getTestsDSP);
router.route('/:patientId').get(protect, getTestsForPatient);
router.route('/:testId').put(protect, updateTest);
router.route('/pdf/:testId').put(protect, admin, sendTestPatientPDF);

export default router;
