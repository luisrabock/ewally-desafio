const express = require('express');
const BankBilletsController = require('../controllers/BankBilletsController');

const routes = express.Router();

routes.get('/api/v1/boleto/:PayNumber', BankBilletsController.validate);

module.exports = routes;
