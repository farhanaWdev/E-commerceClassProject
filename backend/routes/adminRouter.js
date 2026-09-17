const express = require('express');
const { allusersControler } = require('../controllers/adminController');

const _ = express.Router();

// All Controllers
_.get('/allUsers', allusersControler);


module.exports = _;