import express from 'express';
const router = express.Router();
import { addPatient, getPatients } from '../controllers/patientController.js';

router.route('/').post(addPatient).get(getPatients);

export default router;
