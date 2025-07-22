const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const cartController = require('../src/controllers/cart.controller');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/cart/add', cartController.addToCart);
app.get('/api/cart/get', cartController.getCart);
app.post('/api/cart/update', cartController.updateCart);
app.post('/api/cart/delete', cartController.deleteCart);

module.exports = app;
module.exports.handler = serverless(app); 