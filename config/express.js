const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mailService = require('../services/mail');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../static/privacy_policy.html')));

app.post('/notificate', (req, res) => {
  mailService.send({ body: req.body });
  res.status(200).send();
});

module.exports = app;
