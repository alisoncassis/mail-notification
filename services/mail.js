const nodemailer = require('nodemailer');
const smtpConfig = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const emails = [
  process.env.EMAIL_ALISON,
  // process.env.EMAIL_PEDRO,
  // process.env.EMAIL_VINICIUS,
];

const textMessage = body => {
    return `Olá senhores!

Teve uma solicitação no Seuvet com os seguintes dados:
${JSON.stringify(body)}


Atenciosamente,

Seuvet`;
  };

const transporter = nodemailer.createTransport(smtpConfig);

const MailService = {
  send: data => {
    const message = {
      from: smtpConfig.auth.user,
      to: emails.join(),
      subject: 'Seuvet - solicitação',
      text: textMessage(data.body),
    };

    return transporter.sendMail(message)
      .then(resp => console.log(resp))
      .catch(err => console.log(err));
  },
};

module.exports = MailService;
