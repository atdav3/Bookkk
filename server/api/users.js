const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('../src/config/connectDB');
const usersController = require('../src/controllers/users.controller');
const { asyncHandler, authUser, authAdmin } = require('../src/auth/checkAuth');
const multer = require('multer');
const path = require('path');

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/avatars');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

app.post('/api/users/register', asyncHandler(usersController.register));
app.post('/api/users/login', asyncHandler(usersController.login));
app.post('/api/users/auth', authUser, asyncHandler(usersController.authUser));
app.post('/api/users/refresh-token', asyncHandler(usersController.refreshToken));
app.post('/api/users/logout', authUser, asyncHandler(usersController.logout));
app.post('/api/users/update', authUser, asyncHandler(usersController.updateUser));
app.post('/api/users/update-password', authUser, asyncHandler(usersController.updatePassword));
app.post('/api/users/upload-avatar', authUser, upload.single('avatar'), asyncHandler(usersController.uploadAvatar));
app.post('/api/users/forgot-password', asyncHandler(usersController.forgotPassword));
app.post('/api/users/reset-password', asyncHandler(usersController.resetPassword));
app.get('/api/users/get-users', authUser, asyncHandler(usersController.getUsers));
app.post('/api/users/update-role-user', authUser, asyncHandler(usersController.updateRoleUser));
app.get('/api/users/get-dashboard', authUser, asyncHandler(usersController.getDashboard));
app.get('/api/users/admin', authAdmin, (req, res) => {
    return res.status(200).json({ ok: true });
});

module.exports = app;
module.exports.handler = serverless(app); 