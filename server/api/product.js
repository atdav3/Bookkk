const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const productController = require('../src/controllers/products.controller');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/product/create', productController.createProduct);
app.get('/api/product/get-all', productController.getAllProduct);
app.get('/api/product/get-detail/:id', productController.getDetailProduct);
app.post('/api/product/update', productController.updateProduct);
app.post('/api/product/delete', productController.deleteProduct);

module.exports = app;
module.exports.handler = serverless(app); 