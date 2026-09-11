const express = require('express');
const { registrationController, loginController, verifyEmailController } = require('../controllers/authController');
const _ = express.Router();

// All Controllers 
_.post('/registration', registrationController)
_.post('/login',loginController)
_.post('/verifyEmail/:token', verifyEmailController)



module.exports = _