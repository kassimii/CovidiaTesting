import asyncHandler from 'express-async-handler';
import { parse } from 'json2csv';
import Test from '../models/testModel.js';
import { createPatientPdf } from '../utils/generatePDF.js';
import { convertDate, generatePdfName } from '../utils/commonFunctions.js';
import { s3 } from '../config/aws.js';

//@desc Create new test entry
//@route POST /api/tests
//@access Private
const addTestEntry = asyncHandler(async (req, res) => {
  const { prelevationDate, patient, collectedBy } = req.body;

  const test = new Test({
    patient,
    prelevationDate,
    collectedBy,
  });

  const createdTest = await test.save();

  res.status(201).json(createdTest);
});

//@desc Get tests for patient by id
//@route GET /api/tests/:patientId
//@access Private
const getTestsForPatient = asyncHandler(async (req, res) => {
  const tests = await Test.find({ patient: req.params.patientId }).sort(
    '-prelevationDate'
  );
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
    test.resultBy = req.body.resultBy;

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
    .populate('collectedBy', 'name')
    .populate('resultBy', 'name')
    .sort({ sentToDSP: 1, prelevationDate: -1 })
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
    try {
      createPatientPdf(test);
    } catch (err) {
      res.send(err);
      return;
    }

    test.sentToPatient = true;
    const updatedTest = await test.save();
    res.json(updatedTest);
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

//@desc Generate, upload csv to AWS S3 & send to client
//@route GET /api/tests/dsp
//@access Private/Admin
const getCSVForDSP = asyncHandler(async (req, res) => {
  var todayBegin = new Date();
  todayBegin.setUTCHours(0, 0, 0, 0);
  var todayEnd = new Date(todayBegin.getTime());
  todayEnd.setUTCHours(23, 59, 59, 0);

  const todaysTests = await Test.find({
    resultDate: {
      $gte: todayBegin,
      $lt: todayEnd,
    },
  }).populate(
    'patient',
    'name surname cnp phoneNumber email addressID addressResidence'
  );

  if (todaysTests) {
    const updatedResidenceTests = todaysTests.map((test) => {
      if (!test.patient.addressResidence) {
        test.patient.addressResidence = test.patient.addressID;
      }

      test.prelevationDateConverted = convertDate(test.prelevationDate);
      test.resultDateConverted = convertDate(test.resultDate);

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
      { label: 'Data prelevare', value: 'prelevationDateConverted' },
      { label: 'Data rezultat', value: 'resultDateConverted' },
      { label: 'ID lab', value: 'labId' },
    ];
    const opts = { fields };

    try {
      const csv = parse(updatedResidenceTests, opts);
      const csvBuffer = Buffer.from(csv);

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `dsp/rezultate_${convertDate(todayBegin)}.csv`,
        Body: csvBuffer,
      };

      s3.upload(uploadParams, (error, data) => {
        if (error) {
          res.status(500).send(error);
        }
      });

      const downloadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `dsp/rezultate_${convertDate(todayBegin)}.csv`,
      };

      const downloadUrl = s3.getSignedUrl('getObject', downloadParams);
      if (downloadUrl) {
        res.send(downloadUrl);
      } else {
        res.status(404);
        throw new Error('File not found');
      }

      try {
        var updatedTestsToday = await Test.updateMany(
          { resultDate: { $gte: todayBegin, $lt: todayEnd } },
          { $set: { sentToDSP: true } }
        );
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(404);
    throw new Error('Test not found');
  }
});

//verify function - verifies if there are any tests results generated today
const verifyTodaysTests = asyncHandler(async (req, res) => {
  var todayBegin = new Date();
  todayBegin.setUTCHours(0, 0, 0, 0);
  var todayEnd = new Date(todayBegin.getTime());
  todayEnd.setUTCHours(23, 59, 59, 0);

  const todaysTests = await Test.countDocuments({
    resultDate: {
      $gte: todayBegin,
      $lt: todayEnd,
    },
  });

  if (todaysTests === 0) {
    res.send('No tests today');
    return;
  }
});

//@desc Download patent pdf
//@route GET /api/tests/pdf/:testId
//@access Private/Admin
const downloadPdf = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId).populate(
    'patient',
    'name surname cnp email'
  );

  if (test) {
    const pdfName = generatePdfName(test);

    const downloadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pacienti/${pdfName}`,
    };

    const downloadUrl = s3.getSignedUrl('getObject', downloadParams);
    if (downloadUrl) {
      res.send(downloadUrl);
    } else {
      res.status(404);
      throw new Error('File not found');
    }
  }
});

//@desc Edit test
//@route PUT /api/tests/:testId
//@access Private/Admin
const editTest = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId);

  if (test) {
    test.prelevationDate = req.body.prelevationDate || test.prelevationDate;
    test.resultDate = req.body.resultDate || test.resultDate;
    test.status = req.body.status || test.status;

    const updatedTest = await test.save();
    res.json(updatedTest);
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
  getCSVForDSP,
  verifyTodaysTests,
  downloadPdf,
  editTest,
};
