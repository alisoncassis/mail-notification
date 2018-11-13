const nodemailer = require('nodemailer');
const { generateConfirmationUrl } = require('../utils/urls')
const smtpConfiguration = env => ({
    host: env === 'prod' ? process.env.EMAIL_HOST : process.env.HOMOLOG_EMAIL_HOST,
    port: env === 'prod' ? process.env.EMAIL_PORT : process.env.HOMOLOG_EMAIL_PORT,
    secure: env === 'prod' ? process.env.EMAIL_SECURE : process.env.HOMOLOG_EMAIL_SECURE,
    auth: {
        user: env === 'prod' ? process.env.EMAIL_USER : process.env.HOMOLOG_EMAIL_USER,
        pass: env === 'prod' ? process.env.EMAIL_PASS : process.env.HOMOLOG_EMAIL_PASS,
    },
})

const emails = [
    process.env.EMAIL1,
    process.env.EMAIL2,
    process.env.EMAIL3,
];

const subjects = {
    notifytTeamOfNewUser: 'SeuVet - solicitação novo usuário',
    contactUs: 'SeuVet - mensagem via Fale Conosco',
    errorReport: 'SeuVet - mensagem via Reporte de erros',
    sendConfirmationMailToUser: 'SeuVet - Confirmação de email',
}

const textMessage = {
    notifytTeamOfNewUser: ({ body, env }) => {
        return `Olá equipe!

    Teve uma solicitação de novo usuário no SeuVet com os seguintes dados:
    ${JSON.stringify(body)}

    Atenciosamente,

    SeuVet`;
    },
    contactUs: ({ body, env }) => {
        return `Olá equipe!

    Teve uma mensagem via Fale Conosco no SeuVet com os seguintes dados:
    ${JSON.stringify(body)}

    Atenciosamente,

    SeuVet`;
    },
    errorReport: ({ body, env }) => {
        return `Olá equipe!

    Teve uma mensagem via Report de erro no SeuVet com os seguintes dados:
    ${JSON.stringify(body)}

    Atenciosamente,

    SeuVet`;
    },
    sendConfirmationMailToUser: ({ body, env }) => {
        return `Olá ${body.firstName}!

    Clique no link abaixo para confirmarmos o seu email, e em seguida aproveite o melhor sistema do setor Veterinário!

    ${generateConfirmationUrl({ body, env })}

    Atenciosamente,

    SeuVet`;
    }
}


const MailService = {
    send: ({ body, type, internal, env }) => {
        const smtpConfig = smtpConfiguration(env)
        const transporter = nodemailer.createTransport(smtpConfig);
        const message = {
            from: smtpConfig.auth.user,
            to: internal ? emails.join() : body.email,
            subject: subjects[type],
            text: textMessage[type]({ body, env }),
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