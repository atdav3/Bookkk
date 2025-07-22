const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const viewProductController = require('../src/controllers/viewProduct.controller');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/view-product/add', viewProductController.addViewProduct);
app.get('/api/view-product/get', viewProductController.getViewProduct);

module.exports = app;
module.exports.handler = serverless(app); 