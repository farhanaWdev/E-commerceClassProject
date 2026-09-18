const express = require('express');
const { registrationController, loginController, verifyEmailController, forgotPasswordController, ResetPasswordController } = require('../controllers/authController');
const _ = express.Router();

/**
 * @swagger
 * /api/v1/auth/registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               terms:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 */
_.post('/registration', registrationController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 */
_.post('/login', loginController);

/**
 * @swagger
 * /api/v1/auth/verifyEmail/{token}:
 *   post:
 *     summary: Verify User Email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified
 */
_.post('/verifyEmail/:token', verifyEmailController);

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   post:
 *     summary: Forgot Password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset link sent
 */
_.post('/forgotPassword', forgotPasswordController);

/**
 * @swagger
 * /api/v1/auth/resetPassword/{token}:
 *   post:
 *     summary: Reset Password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
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
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password update done
 */
_.post('/resetPassword/:token', ResetPasswordController);

module.exports = _;