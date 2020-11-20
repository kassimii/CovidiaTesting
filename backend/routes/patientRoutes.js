import express from 'express';
const router = express.Router();
import { addPatient } from '../controllers/patientController.js';

router.route('/').post(addPatient);

export default router;
