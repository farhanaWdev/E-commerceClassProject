const express = require('express');
const { userController, createCategory, getAllCategory } = require('../controllers/userController');
const _ = express.Router();

/**
 * @swagger
 * /api/v1/user/product:
 *   get:
 *     summary: Get User Products
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
_.get('/product', userController);

/**
 * @swagger
 * /api/v1/user/create/category:
 *   post:
 *     summary: Create a new category
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
_.post('/create/category', createCategory);

/**
 * @swagger
 * /api/v1/user/all/category:
 *   get:
 *     summary: Get all categories
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All Category list
 */
_.get('/all/category', getAllCategory);

module.exports = _;