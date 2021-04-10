import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

import { convertDate } from '../utils/commonFunctions.js';

dotenv.config();

const startY = 210;

function generateHeader(doc) {
  doc
    // .image('logo.png')
    .fillColor('#444444')
    .fontSize(8)
    .font('Helvetica')
    .text('UNIVERSITATEA', {
      align: 'left',
    })
    .text('DE MEDICINA SI FARMACIE', {
      align: 'left',
    })
    .text('VICTOR BABES TIMISOARA', {
      align: 'left',
    })
    .moveDown()
    .font('Helvetica-Oblique')
    .text('Laborator de Diagnostic Biochimic si Molecular', 200, 65, {
      align: 'right',
    })
    .text('Disciplina de Biochimie', 200, 80, { align: 'right' })
    .moveDown();
}

function generateTitle(doc, testInfo) {
  doc
    .moveDown()
    .font('Helvetica')
    .fontSize(12)
    .text(`Buletin analize`, 70, 150, {
      align: 'center',
    })
    .text(`NR. 1  Data ${convertDate(testInfo.prelevationDate)}`, {
      align: 'center',
    })
    .text(`Determinare SARS-CoV2`, {
      align: 'center',
    });
}

function textInRowFirst(doc, text, heigth) {
  doc.y = heigth;
  doc.x = 50;
  doc.fillColor('black');
  doc.font('Helvetica-Bold').fontSize(10).text(text, {
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
  doc.font('Helvetica-Bold').fontSize(10).text(text, {
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
  doc.font('Helvetica').fontSize(10).text(text, {
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
  doc.font('Helvetica').fontSize(10).text(text, {
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
  textInRowFirst(doc, 'Judet', startY + 65);
  textInRowFirst(doc, 'Unitate', startY + 85);

  textInRowSecond(doc, 'Data recoltare proba', startY + 5);
  textInRowSecond(doc, 'Data emitere rezultat', startY + 25);
  textInRowSecond(doc, 'Tip proba', startY + 45);
  textInRowSecond(doc, 'Personal Consortiu Universitar', startY + 65);
  textInRowSecond(doc, 'Observatii(CI/Pasaport)', startY + 85);

  doc.moveDown();
}

function generateTestInfo(doc) {
  doc.x = 70;
  doc
    .moveDown()
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Metoda - ', { continued: true })
    .font('Helvetica-Oblique')
    .text('Real-time PCR: ', { continued: true })
    .font('Helvetica')
    .text(
      'reactie de polimerizare in lant cu detectie in timp real a fluorescentei produsului PCR acumulat'
    )
    .moveDown();

  doc
    .moveDown()
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Interpretarea rezultatelor:')
    .font('Helvetica')
    .text('Negativ', { continued: true })
    .text('= nu se detecteaza prezenta SARS-CoV2 (negativ)', 120)
    .text('Pozitiv', { continued: true })
    .text(
      '= virusul SARS-CoV2 este detectat in materialul biologic recoltat',
      125
    )
    .text('Neconcludent', { continued: true })
    .text('= este necesara repetarea recoltarii si a testarii', 93)
    .moveDown();
}

function generateResult(doc, testResult) {
  var res = testResult.toUpperCase();
  doc
    .moveDown()
    .fontSize(12)
    .font('Helvetica-Bold')
    .text(`Rezultat: ${res}`)
    .moveDown();
}

function generateFooter(doc) {
  doc
    .fontSize(8)
    .font('Helvetica-Oblique')
    .fillColor('gray')
    .text(
      'Rezultatul reprezinta statusul viral la momentul recoltarii. Un rezultat negativ sau neconcludent nu exclude posibilitatea unei infectii cu SARS-CoV2. In cazul în care exista o simptomatologie sugestiva si un rezultat PCR ARN SARS-CoV2 nedetectabil (negativ), se recomanda repetarea recoltarii si a testarii . De asemenea, in cazul unui rezultat neconcludent este necesara repetarea testului.',
      40,
      660,
      { align: 'justify', width: 530 }
    )
    .moveDown()
    .text(
      'Rezultatele incercarilor se refera numai la produsul supus analizei. Rezultatele acestui buletin nu pot fi reproduse fara acordul  laboratorului.  Raspunderea  asupra  corectitudinii  informatiilor  declarate  de  pacient/apartinatori  revine exclusiv acestuia/acestora.',

      { align: 'justify', width: 530 }
    );
}

function insertDataIntoTable(doc, testInfo) {
  dataInRowFirst(doc, `${testInfo.patient.name}`, startY + 5);
  dataInRowFirst(doc, `${testInfo.patient.surname}`, startY + 25);
  dataInRowFirst(doc, `${testInfo.patient.cnp}`, startY + 45);
  dataInRowFirst(doc, 'Timis', startY + 65);
  dataInRowFirst(doc, 'LDBM', startY + 85);

  // const prelevationDateConverted = convertDate(testInfo.prelevationDate);

  console.log(testInfo.prelevationDate);

  dataInRowSecond(doc, `${convertDate(testInfo.prelevationDate)}`, startY + 5);
  dataInRowSecond(doc, `${convertDate(testInfo.resultDate)}`, startY + 25);
  dataInRowSecond(doc, 'EXUDAT NAZAL-FARINGAL', startY + 45);
  dataInRowSecond(doc, 'DA', startY + 65);
  dataInRowSecond(doc, '', startY + 85);
}

export function createPatientPdf(testInfo) {
  const doc = new PDFDocument();

  generateHeader(doc);
  generateTitle(doc, testInfo);
  generateTable(doc);
  generateTestInfo(doc);
  generateResult(doc, testInfo.status);
  generateFooter(doc);
  insertDataIntoTable(doc, testInfo);

  doc.end();

  const invoiceName = `${testInfo.patient.name}_${
    testInfo.patient.surname
  }_${convertDate(testInfo.prelevationDate)}.pdf`;
  const invoicePath = path.join('pdfs', invoiceName);

  doc.pipe(fs.createWriteStream(invoicePath));

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.TRANSPORTER_EMAIL}`,
      pass: `${process.env.TRANSPORTER_PASS}`,
    },
  });

  var mailOptions = {
    from: `COVIDTesting <${process.env.TRANSPORTER_EMAIL}>`,
    to: `${testInfo.patient.email}`,
    subject: 'Rezultate test PCR',
    text: 'Atașat aveți buletinul de analize.',
    attachments: [{ filename: invoiceName, path: invoicePath }],
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
