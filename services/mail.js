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
    process.env.EMAIL1,
    process.env.EMAIL2,
    process.env.EMAIL3,
];

const textMessage = body => {
    return `Olá equipe!

  Teve uma solicitação de novo usuário no SeuVet com os seguintes dados:
  ${JSON.stringify(body)}


  Atenciosamente,

  SeuVet`;
};

const transporter = nodemailer.createTransport(smtpConfig);

const MailService = {
    send: data => {
        const message = {
            from: smtpConfig.auth.user,
            to: emails.join(),
            subject: 'SeuVet - solicitação novo usuário',
            text: textMessage(data.body),
            priority: 'high',
        };

        return transporter.sendMail(message)
            .then(resp => resp)
            .catch(err => {
                console.log(err)
                return err
            })
    },
};

module.exports = MailService;