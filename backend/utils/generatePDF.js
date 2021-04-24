import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';
import { s3 } from '../config/aws.js';

import { convertDate, generatePdfName } from '../utils/commonFunctions.js';

dotenv.config();

const startY = 210;

function generateHeader(doc) {
  doc
    .image('backend/pdf_utils/pics/logo.png', 35, 45, { width: 200 })
    .fillColor('#444444')
    .moveDown()
    .fontSize(10)
    .font('backend/pdf_utils/fonts/aileron/Aileron-Italic.otf')
    .text('Laborator de Diagnostic Biochimic și Molecular', 200, 65, {
      align: 'right',
    })
    .text('Disciplina de Biochimie', 200, 80, { align: 'right' })
    .moveDown();
}

function generateTitle(doc, testInfo) {
  doc
    .moveDown()
    .font('backend/pdf_utils/fonts/aileron/Aileron-SemiBold.otf')
    .fontSize(14)
    .text(`Buletin analize`, 70, 130, {
      align: 'center',
    })
    .text(
      `NR. ${testInfo.testReportNumber}  Data ${convertDate(
        testInfo.resultDate
      )}`,
      {
        align: 'center',
      }
    )
    .text(`Determinare SARS-CoV2`, {
      align: 'center',
    });
}

function textInRowFirst(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 50;
  doc.fillColor('black');
  doc
    .font('backend/pdf_utils/fonts/aileron/Aileron-Bold.otf')
    .fontSize(10)
    .text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
  return doc;
}

function textInRowSecond(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 275;
  doc.fillColor('black');
  doc
    .font('backend/pdf_utils/fonts/aileron/Aileron-Bold.otf')
    .fontSize(10)
    .text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
  return doc;
}

function dataInRowFirst(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 130;
  doc.fillColor('black');
  doc
    .font('backend/pdf_utils/fonts/aileron/Aileron-Light.otf')
    .fontSize(10)
    .text(text, {
      paragraphGap: 5,
      indent: 5,
      align: 'justify',
      columns: 1,
    });
  return doc;
}

function dataInRowSecond(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 440;
  doc.fillColor('black');
  doc
    .font('backend/pdf_utils/fonts/aileron/Aileron-Light.otf')
    .fontSize(10)
    .text(text, {
      width: 130,
    });
  return doc;
}

function row(doc, heigth) {
  doc.lineJoin('miter').rect(40, heigth, 530, 20).stroke();
  return doc;
}

function generateTable(doc) {
  doc
    .lineCap('butt')
    .moveTo(120, startY)
    .lineTo(120, startY + 100)
    .stroke();
  doc
    .lineCap('butt')
    .moveTo(270, startY)
    .lineTo(270, startY + 100)
    .stroke();
  doc
    .lineCap('butt')
    .moveTo(430, startY)
    .lineTo(430, startY + 100)
    .stroke();

  row(doc, startY);
  row(doc, startY + 20);
  row(doc, startY + 40);
  row(doc, startY + 60);
  row(doc, startY + 80);

  textInRowFirst(doc, 'Nume', startY + 5);
  textInRowFirst(doc, 'Prenume', startY + 25);
  textInRowFirst(doc, 'CNP', startY + 45);
  textInRowFirst(doc, 'Județ', startY + 65);
  textInRowFirst(doc, 'Unitate', startY + 85);

  textInRowSecond(doc, 'Dată recoltare probă', startY + 5);
  textInRowSecond(doc, 'Dată emitere rezultat', startY + 25);
  textInRowSecond(doc, 'Tip probă', startY + 45);
  textInRowSecond(doc, 'Personal Consorțiu Universitar', startY + 65);
  textInRowSecond(doc, 'Observații(CI/Pasaport)', startY + 85);

  doc.moveDown();
}

function generateTestInfo(doc) {
  doc.x = 70;
  doc
    .moveDown()
    .fontSize(12)
    .font('backend/pdf_utils/fonts/aileron/Aileron-Bold.otf')
    .text('Metoda - ', { continued: true })
    .font('backend/pdf_utils/fonts/aileron/Aileron-Italic.otf')
    .text('Real-time PCR: ', { continued: true })
    .font('backend/pdf_utils/fonts/aileron/Aileron-Light.otf')
    .text(
      'reacție de polimerizare în lanț cu detecie în timp real a fluoreșcenței produsului PCR acumulat'
    )
    .moveDown();

  doc
    .moveDown()
    .fontSize(12)
    .font('backend/pdf_utils/fonts/aileron/Aileron-Bold.otf')
    .text('Interpretarea rezultatelor:')
    .font('backend/pdf_utils/fonts/aileron/Aileron-Light.otf')
    .text('Negativ', { continued: true })
    .text('= nu se detectează prezența SARS-CoV2 (negativ)', 120)
    .text('Pozitiv', { continued: true })
    .text(
      '= virusul SARS-CoV2 este detectat în materialul biologic recoltat',
      125
    )
    .text('Neconcludent', { continued: true })
    .text('= este necesară repetarea recoltării și a testării', 85)
    .moveDown();
}

function generateResult(doc, testResult) {
  var res = testResult.toUpperCase();
  doc
    .moveDown()
    .fontSize(14)
    .font('backend/pdf_utils/fonts/aileron/Aileron-Bold.otf')
    .text(`Rezultat: ${res}`)
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(8)
    .font('backend/pdf_utils/fonts/aileron/Aileron-Italic.otf')
    .fillColor('gray')
    .text(
      'Rezultatul reprezintă statusul viral la momentul recoltării. Un rezultat negativ sau neconcludent nu exclude posibilitatea unei infecții cu SARS-CoV2. În cazul în care există o simptomatologie sugestivă și un rezultat PCR ARN SARS-CoV2 nedetectabil (negativ), se recomandă repetarea recoltării și a testării. De asemenea, în cazul unui rezultat neconcludent este necesară repetarea testului.',
      40,
      660,
      { align: 'justify', width: 530 }
    )
    .moveDown()
    .text(
      'Rezultatele încercarilor se referă numai la produsul supus analizei. Rezultatele acestui buletin nu pot fi reproduse fără acordul  laboratorului.  Răspunderea  asupra  corectitudinii  informațiilor  declarate  de  pacient/aparținători  revine exclusiv acestuia/acestora.',

      { align: 'justify', width: 530 }
    );
}

function insertDataIntoTable(doc, testInfo) {
  dataInRowFirst(doc, `${testInfo.patient.name}`, startY + 5);
  dataInRowFirst(doc, `${testInfo.patient.surname}`, startY + 25);
  dataInRowFirst(doc, `${testInfo.patient.cnp}`, startY + 45);
  dataInRowFirst(doc, 'Timis', startY + 65);
  dataInRowFirst(doc, 'LDBM', startY + 85);

  dataInRowSecond(doc, `${convertDate(testInfo.prelevationDate)}`, startY + 5);
  dataInRowSecond(doc, `${convertDate(testInfo.resultDate)}`, startY + 25);
  dataInRowSecond(doc, 'EXUDAT NAZAL-FARINGAL', startY + 45);
  dataInRowSecond(doc, 'DA', startY + 65);
  dataInRowSecond(doc, '', startY + 85);
}

function insertDoctorStamp(doc, doctorStamp) {
  const doctorStampImage =
    doctorStamp === '1'
      ? 'backend/pdf_utils/pics/doctor-1.jpg'
      : 'backend/pdf_utils/pics/doctor-2.jpg';

  doc
    .font('backend/pdf_utils/fonts/aileron/Aileron-Light.otf')
    .fontSize(12)
    .text('Executat: ', 100, 580, { continued: true })
    .image(doctorStampImage, 160, 540, { width: 100 });
}

export function createPatientPdf(testInfo, doctorStamp) {
  const doc = new PDFDocument();

  generateHeader(doc);
  generateTitle(doc, testInfo);
  generateTable(doc);
  generateTestInfo(doc);
  generateResult(doc, testInfo.status);
  generateFooter(doc);
  insertDataIntoTable(doc, testInfo);
  insertDoctorStamp(doc, doctorStamp);

  doc.end();

  const pdfName = generatePdfName(testInfo);

  try {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `pacienti/${pdfName}`,
      Body: doc,
    };

    s3.upload(uploadParams, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
  } catch (err) {
    throw new Error(err);
  }

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: `${process.env.TRANSPORTER_EMAIL}`,
  //     pass: `${process.env.TRANSPORTER_PASS}`,
  //   },
  // });

  // var mailOptions = {
  //   from: `COVIDTesting <${process.env.TRANSPORTER_EMAIL}>`,
  //   to: `${testInfo.patient.email}`,
  //   subject: 'Rezultate test PCR',
  //   text: 'Atașat aveți buletinul de analize.',
  //   attachments: [{ filename: invoiceName, path: invoicePath }],
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     throw new Error(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
}
