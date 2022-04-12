'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

const user_mailer = process.env.USER_MAILER;
const password_mailer = process.env.PASSWORD_MAILER;

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true, // true for 465, false for other ports
    // port: 587,
    port: 465,
    auth: {
      user: user_mailer,
      pass: password_mailer,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: user_mailer, // sender address
    to: 'hadmarcano@gmail.com', // list of receivers
    subject: 'NUEVO CORREO ✔', // Subject line
    text: 'Hello Hector?', // plain text body
    html: '<b>Hello from Node Postgres Store App!</b>', // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
