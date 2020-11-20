import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';

//@desc Add new patient
//@route POST /api/patients
//@access Public
const addPatient = asyncHandler(async (req, res) => {
  const {
    name,
    surname,
    cnp,
    addressID,
    phoneNumber,
    email,
    addressResidence,
  } = req.body;

  const patientExists = await Patient.findOne({ cnp });

  if (patientExists) {
    res.status(404);
    throw new Error('Patient already exists');
  }

  const patient = await Patient.create({
    name,
    surname,
    cnp,
    addressID,
    phoneNumber,
    email,
    addressResidence,
  });

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      surname: patient.surname,
      cnp: patient.cnp,
      addressID: patient.addressID,
      phoneNumber: patient.phoneNumber,
      email: patient.email,
      addressResidence: patient.addressResidence,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

export { addPatient };
