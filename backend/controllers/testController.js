import asyncHandler from 'express-async-handler';
import Test from '../models/testModel.js';
import { createPatientPdf } from '../utils/generatePDF.js';
import { convertDate } from '../utils/commonFunctions.js';
import { parse } from 'json2csv';
import fs from 'fs';

//@desc Create new test entry
//@route POST /api/tests
//@access Private
const addTestEntry = asyncHandler(async (req, res) => {
  const { prelevationDate, patient } = req.body;

  const test = new Test({
    patient,
    prelevationDate,
  });

  const createdTest = await test.save();

  res.status(201).json(createdTest);
});

//@desc Get tests for patient by id
//@route GET /api/tests/:patientId
//@access Private
const getTestsForPatient = asyncHandler(async (req, res) => {
  const tests = await Test.find({ patient: req.params.patientId });
  res.json(tests);
});

//@desc Update test result
//@route PUT /api/tests/:testId
//@access Private
const updateTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId);

  if (test) {
    test.resultDate = req.body.resultDate;
    test.status = req.body.status;

    const updatedTest = await test.save();
    res.json(updatedTest);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

//@desc Get all tests
//@route GET /api/tests
//@access Private/Admin
const getTests = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Test.countDocuments();

  const tests = await Test.find({})
    .populate('patient', 'id patientCode')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ tests, page, pages: Math.ceil(count / pageSize) });
});

//@desc Send test result for Patient
//@route PUT /api/tests/pdf/:testId
//@access Private/Admin
const sendTestPatientPDF = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId).populate(
    'patient',
    'name surname cnp email'
  );

  if (test) {
    createPatientPdf(test);

    test.sentToPatient = true;
    const updatedTest = await test.save();
    res.json(updatedTest);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

//@desc Get daily test results for DSP
//@route GET /api/tests/dsp
//@access Private/Admin
const getTestsDSP = asyncHandler(async (req, res) => {
  const tests = await Test.find({}).populate(
    'patient',
    'name surname cnp phoneNumber email addressID addressResidence'
  );

  if (tests) {
    var today = convertDate(new Date());

    const todaysTests = tests.filter((test) => {
      return test.resultDate === today;
    });

    const updatedResidenceTests = todaysTests.map((test) => {
      if (!test.patient.addressResidence) {
        test.patient.addressResidence = test.patient.addressID;
      }
      return test;
    });

    const fields = [
      { label: 'Nume', value: 'patient.name' },
      { label: 'Prenume', value: 'patient.surname' },
      { label: 'CNP', value: 'patient.cnp' },
      { label: 'Nr. telefon', value: 'patient.phoneNumber' },
      { label: 'Email', value: 'patient.email' },
      { label: 'Adresa resedinta', value: 'patient.addressResidence' },
      { label: 'Rezultat test', value: 'status' },
      { label: 'Data prelevare', value: 'prelevationDate' },
      { label: 'Data rezultat', value: 'resultDate' },
      { label: 'ID lab', value: 'labId' },
    ];
    const opts = { fields };

    try {
      const csv = parse(updatedResidenceTests, opts);

      fs.writeFile(`rezultate_${today}.csv`, csv, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

      res.sendStatus(200);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

export {
  addTestEntry,
  getTestsForPatient,
  updateTest,
  getTests,
  sendTestPatientPDF,
  getTestsDSP,
};
