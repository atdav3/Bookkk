const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const paymentsController = require('../src/controllers/payments.controller');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/payments/create', paymentsController.createPayment);
app.get('/api/payments/get', paymentsController.getPayments);

module.exports = app;
module.exports.handler = serverless(app); 