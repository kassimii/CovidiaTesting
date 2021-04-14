import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.TRANSPORTER_EMAIL}`,
    pass: `${process.env.TRANSPORTER_PASS}`,
  },
});
