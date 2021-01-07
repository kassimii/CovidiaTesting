import express from 'express';
const router = express.Router();
import {
  addPatient,
  getPatients,
  updatePatient,
  getPatientById,
} from '../controllers/patientController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addPatient).get(protect, getPatients);
router.route('/:id').get(protect, getPatientById).put(protect, updatePatient);

export default router;
