const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const categoryController = require('../src/controllers/category.controller');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/category/create', categoryController.createCategory);
app.get('/api/category/get-all', categoryController.getAllCategory);
app.post('/api/category/update', categoryController.updateCategory);
app.post('/api/category/delete', categoryController.deleteCategory);

module.exports = app;
module.exports.handler = serverless(app); 