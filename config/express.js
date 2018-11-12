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

//app
app.get('/policy', (req, res) => res.sendFile(path.join(__dirname, '../static/app/privacy_policy.html')));

app.get('/:environment/web/erro', (req, res) => res.sendFile(path.join(__dirname, '../static/web/error.html')));
app.get('/:environment/web/politica-de-privacidade', (req, res) => res.sendFile(path.join(__dirname, '../static/web/privacy_policy.html')));
app.get('/:environment/web/termos-de-uso', (req, res) => res.sendFile(path.join(__dirname, '../static/web/terms-of-use.html')));
app.get('/:environment/web/lp/:name', (req, res) => res.sendFile(path.join(__dirname, `../static/web/lp/${req.params.name}.html`)));
app.post('/:environment/autonomous-user', (req, res) => {
    mailService.send({ body: req.body, type: 'notifytTeamOfNewUser', internal: true, env: req.params.environment });
    mailService.send({ body: req.body, type: 'sendConfirmationMailToUser', internal: false, env: req.params.environment });
    res.status(200).send();
});
app.post('/:environment/contact-us', (req, res) => {
    mailService.send({ body: req.body, type: 'contactUs', internal: true, env: req.params.environment });
    res.status(200).send();
});

module.exports = app;