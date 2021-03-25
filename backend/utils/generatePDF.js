import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

dotenv.config();

function generateHeader(doc) {
  doc
    .image('logo.png', 50, 45, { width: 50 })
    .fillColor('#444444')
    .fontSize(20)
    .text('ACME Inc.', 110, 57)
    .fontSize(10)
    .text('123 Main Street', 200, 65, { align: 'right' })
    .text('New York, NY, 10025', 200, 80, { align: 'right' })
    .moveDown();
}

export function createDspPdf(testInfo) {
  const doc = new PDFDocument();
  doc.image('./logo.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center',
  });
  doc.end();

  const invoiceName = `${testInfo._id}.pdf`;
  const invoicePath = path.join('pdfs', invoiceName);

  doc.pipe(fs.createWriteStream(invoicePath));

  // var transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: `${process.env.TRANSPORTER_EMAIL}`,
  //     pass: `${process.env.TRANSPORTER_PASS}`,
  //   },
  // });

  // var mailOptions = {
  //   from: `COVIDTesting <${process.env.TRANSPORTER_EMAIL}>`,
  //   to: 'patiiboc@gmail.com',
  //   subject: 'pdf',
  //   text: "Here's your PDF",
  //   attachments: [{ filename: invoiceName, path: invoicePath }],
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });
}
