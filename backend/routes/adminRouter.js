const express = require('express');
const { allusersControler, singleUser, activeUser, deactiveUser, updateUser, updateCategory, deleteCategory, deleteUserController } = require('../controllers/adminController');

const _ = express.Router();

/**
 * @swagger
 * /api/v1/admin/allUsers:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 */
_.get('/allUsers', allusersControler);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   get:
 *     summary: Get single user info
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User info found
 */
_.get('/users/:id', singleUser);

/**
 * @swagger
 * /api/v1/admin/active/users:
 *   get:
 *     summary: Get active users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Active user info found
 */
_.get('/active/users', activeUser);

/**
 * @swagger
 * /api/v1/admin/deactive/users:
 *   get:
 *     summary: Get deactive users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Deactive user found
 */
_.get('/deactive/users', deactiveUser);

/**
 * @swagger
 * /api/v1/admin/update/users/{id}:
 *   post:
 *     summary: Update User
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: User Updated
 */
_.post('/update/users/:id', updateUser);

/**
 * @swagger
 * /api/v1/admin/update/category/{id}:
 *   post:
 *     summary: Update Category
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *       200:
 *         description: category updated successfully
 */
_.post('/update/category/:id', updateCategory);

/**
 * @swagger
 * /api/v1/admin/delete/category/{id}:
 *   delete:
 *     summary: Delete Category
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: category deleted successfully
 */
_.delete('/delete/category/:id', deleteCategory);

/**
 * @swagger
 * /api/v1/admin/deleteuser/{id}:
 *   delete:
 *     summary: Delete User
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: user deleted successfully
 */
_.delete('/deleteuser/:id', deleteUserController);

module.exports = _;
