
const generateConfirmationUrl = body => {
  const Cryptr = require('cryptr');
  const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);
  return `${process.env.API_URL}/user/verify?hash=${cryptr.encrypt(JSON.stringify({ id: body._id, from: body.from ? body.from : 'default' }))}`
}

module.exports = {
  generateConfirmationUrl
}
