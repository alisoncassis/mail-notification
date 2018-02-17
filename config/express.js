const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mailService = require('../services/mail');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/notificate', (req, res) => {
  console.log(req.body);
  mailService.send({ body: JSON.parse(req.body) });
  res.status(200).send();
});

module.exports = app;
