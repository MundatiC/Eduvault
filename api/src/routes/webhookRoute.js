const express = require('express');

const webhookRouter = express.Router();

const {webhookController} = require('../controllers/webhookController');


webhookRouter.post('/webhook',webhookController);

module.exports = webhookRouter;