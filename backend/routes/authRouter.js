const express = require('express');
const registrationController = require('../controllers/authController');
const _ = express.Router();

// All Controllers 
_.post('/registration', registrationController)


module.exports = _