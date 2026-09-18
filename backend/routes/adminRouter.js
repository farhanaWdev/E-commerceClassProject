const express = require('express');
const { allusersControler, singleUser, activeUser, deactiveUser, updateUser } = require('../controllers/adminController');

const _ = express.Router();

// All Controllers
_.get('/allUsers', allusersControler);
_.get('/users/:id', singleUser);
_.get('/active/users',activeUser);
_.get('/deactive/users',deactiveUser);
_.post('/update/users/:id',updateUser);




module.exports = _;