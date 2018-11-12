const generateConfirmationUrl = ({ body, env }) => {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
    return `${env === 'prod' ? process.env.API_URL : process.env.HOMOLOG_API_URL}/user/verify?hash=${cryptr.encrypt(JSON.stringify({ id: body._id, from: body.from ? body.from : 'default' }))}`
}

module.exports = {
    generateConfirmationUrl
}