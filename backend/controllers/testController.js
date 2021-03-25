import asyncHandler from 'express-async-handler';
import Test from '../models/testModel.js';
import { createDspPdf } from '../utils/generatePDF.js';

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

//@desc Get test result for DSP
//@route GET /api/tests/:testId
//@access Private/Admin
const getTestDSP = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId);

  if (test) {
    createDspPdf(test);
    res.json(test);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

export { addTestEntry, getTestsForPatient, updateTest, getTests, getTestDSP };
