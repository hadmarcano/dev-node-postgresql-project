const UserService = require('./user.services');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config');
require('dotenv').config();

const user_mailer = process.env.USER_MAILER;
const password_mailer = process.env.PASSWORD_MAILER;

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    // jwtExpiration: 3600,           // 1 hour
    // jwtRefreshExpiration: 86400,   // 24 hours
    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
    const token = jwt.sign(
      payload,
      config.secret_key
      // , {
      // // expiresIn: config.jwtExpiration,
      // jwtExpiration: 3600,
      // }
    );

    return {
      user,
      token,
    };
  }

  async sendEmail(email) {
    const user = await service.getByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

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
      to: user.email, // list of receivers
      subject: 'RECUPERACION DE CONTRASEÑA ✔', // Subject line
      text: `Hello ${user.firstname}`, // plain text body
      html: '<b>Hello from Node Postgres Store App!</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return {
      messageSend: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  }
}

module.exports = AuthService;
