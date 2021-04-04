const express = require('express');
const BilletsController = require('../api/controllers/BilletsController');

const routes = express.Router();

routes.get('/api/v1/boleto/:PayNumber', BilletsController.validate);

module.exports = routes;
