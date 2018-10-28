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

app.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../static/app/privacy_policy.html')));
app.get('/web/politica-de-privacidade', (req, res) => res.sendFile(path.join(__dirname, '../static/web/privacy_policy.html')));
app.get('/web/termos-de-uso', (req, res) => res.sendFile(path.join(__dirname, '../static/web/terms-of-use.html')));

app.post('/autonomous-user', (req, res) => {
    mailService.send({ body: req.body, type: 'newUser' });
    res.status(200).send();
});

app.post('/contact-us', (req, res) => {
    mailService.send({ body: req.body, type: 'contactUs' });
    res.status(200).send();
});

module.exports = app;
