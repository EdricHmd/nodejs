import express from 'express';
import { register, login, getProfile,refresh,logoutController, forgotPasswordController, resetPasswordController } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with email, password, name, and optional age. Password is automatically hashed before storage.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *           examples:
 *             fullExample:
 *               value:
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 password: "password123"
 *                 age: 25
 *             minimalExample:
 *               value:
 *                 name: "Jane Smith"
 *                 email: "jane.smith@example.com"
 *                 password: "securepass"
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthSuccessResponse'
 *             example:
 *               success: true
 *               message: "Đăng ký thành công"
 *               data:
 *                 user:
 *                   _id: "507f1f77bcf86cd799439011"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   age: 25
 *                   createdAt: "2025-12-05T10:00:00.000Z"
 *                   updatedAt: "2025-12-05T10:00:00.000Z"
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYzMjE0NTIwMCwiZXhwIjoxNjMyNzUwMDAwfQ.xyz123"
 *       400:
 *         description: Registration failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               emailExists:
 *                 value:
 *                   success: false
 *                   message: "Email already registered"
 *                   errorCode: "REGISTER_FAILED"
 *               validationError:
 *                 value:
 *                   success: false
 *                   message: "User validation failed: password is required"
 *                   errorCode: "REGISTER_FAILED"
 *               passwordTooShort:
 *                 value:
 *                   success: false
 *                   message: "User validation failed: password must be at least 6 characters"
 *                   errorCode: "REGISTER_FAILED"
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates a user with email and password, returns JWT token for subsequent requests
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *           example:
 *             email: "john.doe@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginSuccessResponse'
 *             example:
 *               success: true
 *               message: "Đăng nhập thành công"
 *               data:
 *                 user:
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYzMjE0NTIwMCwiZXhwIjoxNjMyNzUwMDAwfQ.xyz123"
 *                   user:
 *                     id: "507f1f77bcf86cd799439011"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *       401:
 *         description: Login failed - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               invalidCredentials:
 *                 value:
 *                   success: false
 *                   message: "INVALID_CREDENTIALS"
 *                   errorCode: "LOGIN_FAILED"
 *               emailNotFound:
 *                 value:
 *                   success: false
 *                   message: "INVALID_CREDENTIALS"
 *                   errorCode: "LOGIN_FAILED"
 *               wrongPassword:
 *                 value:
 *                   success: false
 *                   message: "INVALID_CREDENTIALS"
 *                   errorCode: "LOGIN_FAILED"
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile information of the currently authenticated user. Requires valid JWT token in Authorization header.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileSuccessResponse'
 *             example:
 *               success: true
 *               message: "Lấy thông tin người dùng thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 25
 *                 createdAt: "2025-12-05T10:00:00.000Z"
 *                 updatedAt: "2025-12-05T10:00:00.000Z"
 *       400:
 *         description: Failed to get profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             example:
 *               success: false
 *               message: "Error retrieving user profile"
 *               errorCode: "GET_PROFILE_FAILED"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               noToken:
 *                 value:
 *                   success: false
 *                   message: "Bạn chưa đăng nhập"
 *                   errorCode: "NOT_AUTHORIZED"
 *               invalidToken:
 *                 value:
 *                   success: false
 *                   message: "Token không hợp lệ hoặc đã hết hạn"
 *                   errorCode: "TOKEN_INVALID"
 */
router.get('/profile', protect, getProfile);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Generates a new access token using the refresh token stored in httpOnly cookie. The refresh token is automatically sent from the browser cookie.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Lấy token mới thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenSuccessResponse'
 *             example:
 *               message: "Lấy token mới thành công"
 *               accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImlhdCI6MTYzMjE0NTIwMCwiZXhwIjoxNjMyNzUwMDAwfQ.xyz123"
 *       401:
 *         description: Refresh token invalid or expired
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenErrorResponse'
 *             examples:
 *               noToken:
 *                 value:
 *                   message: "Refresh token không tồn tại"
 *               invalidToken:
 *                 value:
 *                   message: "Refresh token không hợp lệ hoặc đã hết hạn"
 *               tokenMismatch:
 *                 value:
 *                   message: "Refresh token không hợp lệ"
 */
router.post('/refresh-token', refresh); 

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the currently authenticated user by clearing the refresh token from the database and removing the cookie. Requires valid JWT token in Authorization header.
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Đăng xuất thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutSuccessResponse'
 *             example:
 *               message: "Đăng xuất thành công"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthErrorResponse'
 *             examples:
 *               noToken:
 *                 value:
 *                   success: false
 *                   message: "Bạn chưa đăng nhập"
 *                   errorCode: "NOT_AUTHORIZED"
 *               invalidToken:
 *                 value:
 *                   success: false
 *                   message: "Token không hợp lệ hoặc đã hết hạn"
 *                   errorCode: "TOKEN_INVALID"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LogoutErrorResponse'
 *             example:
 *               message: "Internal server error"
 */
router.post('/logout', protect, logoutController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:token', resetPasswordController);

export default router;