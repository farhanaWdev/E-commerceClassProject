const express = require('express');
const { registrationController, loginController, verifyEmailController, forgotPasswordController } = require('../controllers/authController');
const _ = express.Router();

// All Controllers 
_.post('/registration', registrationController)
_.post('/login',loginController)
_.post('/verifyEmail/:token', verifyEmailController)
_.post('/forgotPassword', forgotPasswordController)




module.exports = _