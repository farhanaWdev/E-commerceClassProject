const express = require('express');
const { createCategory, getAllCategory, createSubCategoryController, getAllsubCategory, getAllCategoryWisesubCategory, getAllCategoryOWNERWisesubCategory } = require('../controllers/vendorController');
const { createProductController, getAllProduct } = require('../controllers/productController');
const multer = require('multer');

const _ = express.Router();

// All Controllers
_.post('/create/category', createCategory );
_.get('/get', getAllCategory );
_.post('/create/subcategory', createSubCategoryController );
_.get('/get/allsubcategory', getAllsubCategory );
_.get('/get/:id/allsubcategory', getAllCategoryWisesubCategory );
_.get('/get/:id/allsubcategoryownerwise', getAllCategoryOWNERWisesubCategory );

//products route
_.post("/createproduct",  createProductController);
_.get('get/products',getAllProduct)




module.exports = _;