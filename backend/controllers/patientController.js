import asyncHandler from 'express-async-handler';
import Patient from '../models/patientModel.js';
import { generatePrefixPhoneNumber } from '../utils/commonFunctions.js';

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
    passportId,
  } = req.body;

  const patientExists = await Patient.findOne({ cnp });

  if (patientExists) {
    res.status(404);
    throw new Error('Pacientul este deja înregistrat!');
  }

  const patientCode = Math.random().toString(36).substr(2, 8);

  const patient = await Patient.create({
    name,
    surname,
    cnp,
    addressID,
    phoneNumber: generatePrefixPhoneNumber(phoneNumber),
    email,
    addressResidence,
    passportId,
    patientCode,
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
      passportId: patient.passportId,
      patientCode: patient.patientCode,
    });
  } else {
    res.status(400);
    throw new Error('Invalid patient data');
  }
});

//@desc Fetch all patients
//@route GET /api/patients
//@access Public
const getPatients = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? req.query.keyword.length === 8
      ? {
          patientCode: req.query.keyword.toLowerCase(),
        }
      : {
          cnp: req.query.keyword,
        }
    : {};

  const count = await Patient.countDocuments({ ...keyword });

  const patients = await Patient.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ patients, page, pages: Math.ceil(count / pageSize) });
});

//@desc Get patient by id
//@route GET /api/patients/:id
//@access Private
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
    throw new Error('Patient not found');
  }
});

//@desc Update patient
//@route PUT /api/patients/:id
//@access Private
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (patient) {
    patient.name = req.body.name || patient.name;
    patient.surname = req.body.surname || patient.surname;
    patient.cnp = req.body.cnp || patient.cnp;
    patient.addressID = req.body.addressID || patient.addressID;
    patient.phoneNumber = req.body.phoneNumber || patient.phoneNumber;
    patient.email = req.body.email;
    patient.passportId = req.body.passportId;
    patient.addressResidence = req.body.addressResidence;

    const updatedPatient = await patient.save();

    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      surname: updatedPatient.surname,
      cnp: updatedPatient.cnp,
      addressID: updatedPatient.addressID,
      phoneNumber: updatedPatient.phoneNumber,
      email: updatedPatient.email,
      passportId: updatedPatient.passportId,
      addressResidence: updatedPatient.addressResidence,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { addPatient, getPatients, getPatientById, updatePatient };
