import asyncHandler from 'express-async-handler';
import { parse } from 'json2csv';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Test from '../models/testModel.js';
import { createPatientPdf } from '../utils/generatePDF.js';
import { convertDate, generatePdfName } from '../utils/commonFunctions.js';
import { s3 } from '../config/aws.js';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const clientTwilio = new twilio(accountSid, authToken);

//@desc Create new test entry
//@route POST /api/tests
//@access Private
const addTestEntry = asyncHandler(async (req, res) => {
  const { prelevationDate, patient, collectedBy, testReportNumber } = req.body;

  const test = new Test({
    patient,
    prelevationDate,
    collectedBy,
    testReportNumber,
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
    .populate('patient', 'id patientCode email')
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
function getS3PdfFile(bucket, key) {
  return new Promise(function (resolve, reject) {
    s3.getObject(
      {
        Bucket: bucket,
        Key: key,
      },
      function (err, data) {
        if (err) return reject(err);
        else return resolve(data);
      }
    );
  });
}

const sendTestPatientPDF = asyncHandler(async (req, res) => {
  const { doctor } = req.body;
  const test = await Test.findById(req.params.testId).populate(
    'patient',
    'name surname cnp email passportId'
  );

  if (test) {
    createPatientPdf(test, doctor)
      .then(function (data) {
        const pdfName = generatePdfName(test);

        getS3PdfFile(process.env.AWS_BUCKET_NAME, data.Key)
          .then(async function (fileData) {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: `${process.env.TRANSPORTER_EMAIL}`,
                pass: `${process.env.TRANSPORTER_PASS}`,
              },
            });
            var mailOptions = {
              from: `COVIDTesting <${process.env.TRANSPORTER_EMAIL}>`,
              to: `${test.patient.email}`,
              subject: 'Rezultate test PCR',
              text: 'Atașat aveți buletinul de analize.',
              attachments: [{ filename: pdfName, content: fileData.Body }],
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                return res.send(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

            test.sentToPatient = true;
            const updatedTest = await test.save();
            res.json(updatedTest);
          })
          .catch(function (error) {
            console.log(error);
            console.log('Error getting attachment from S3');
            return res.status(404).send(error);
          });
      })
      .catch(function (error) {
        console.log(error);
        console.log('Error uploading file to S3');
        return res.status(404).send(error);
      });
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

//@desc Send SMS test result for Patient
//@route PUT /api/tests/sms-test-result/:testId
//@access Private/Admin
const changeCNP = (cnp) => {
  let starredCNP = '';
  starredCNP += cnp.charAt(0) + '*'.repeat(7) + cnp.substring(8, 13);
  return starredCNP;
};
const createMessageBody = (testInfo) => {
  let messageBody = '';
  const positiveMessage = 'Stați acasă și contactați medicul de familie!';
  const negativeMessage =
    'Respectați în continuare regulile de igienă recomandate de autorități.';
  const inconclusiveMessage = 'Efectuați un alt test cât mai repede posibil.';
  messageBody += `Rezultatul testului Covid din data de ${convertDate(
    testInfo.prelevationDate
  )}, pentru ${testInfo.patient.surname.charAt(
    0
  )}. ${testInfo.patient.name.charAt(0)}. ${changeCNP(
    testInfo.patient.cnp
  )}, este ${testInfo.status.toUpperCase()}. `;

  testInfo.status === 'Pozitiv'
    ? (messageBody += positiveMessage)
    : testInfo.status === 'Negativ'
    ? (messageBody += negativeMessage)
    : (messageBody += inconclusiveMessage);

  return messageBody;
};

const sendSMSPatient = asyncHandler(async (req, res) => {
  const test = await Test.findById(req.params.testId).populate(
    'patient',
    'name surname cnp phoneNumber'
  );

  if (test) {
    const messageBody = createMessageBody(test);
    clientTwilio.messages
      .create({
        body: messageBody,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: test.patient.phoneNumber,
      })
      .then(async function () {
        test.sentToPatientSMS = true;
        const updatedTest = await test.save();
        res.json(updatedTest);
      });
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
  sendSMSPatient,
};
