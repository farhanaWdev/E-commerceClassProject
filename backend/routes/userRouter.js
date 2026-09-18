const express = require('express');
const { userController, createCategory, getAllCategory } = require('../controllers/userController');
const _ = express.Router();

// All Controllers
_.get('/product', userController);
_.post('/create/category', createCategory);
_.get('/all/category', getAllCategory);



module.exports = _;
