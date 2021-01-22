import asyncHandler from 'express-async-handler';
import Test from '../models/testModel.js';

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

export { addTestEntry, getTestsForPatient };
