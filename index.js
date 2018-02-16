const dotenv = require('dotenv').config();
const express = require('express');
const mailService = require('./services/mail');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.listen(process.env.PORT, () => console.log(`server running at ${process.env.PORT}`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/notificate', (req, res) => {
  mailService.send({ body: req.body });
  res.status(200).send();
});
