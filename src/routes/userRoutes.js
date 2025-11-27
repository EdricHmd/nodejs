import express from 'express';
import { createUserController, getAllUserController ,getUserDetail,updateUserController,deleteUserController} from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user with name, email, and optional age
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *           examples:
 *             example1:
 *               value:
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 25
 *             example2:
 *               value:
 *                 name: "Jane Smith"
 *                 email: "jane.smith@example.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 25
 *                 createdAt: "2025-11-27T10:00:00.000Z"
 *                 updatedAt: "2025-11-27T10:00:00.000Z"
 *               message: "User created successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *             examples:
 *               duplicateEmail:
 *                 value:
 *                   message: "E11000 duplicate key error collection"
 *               validationError:
 *                 value:
 *                   message: "User validation failed: email is required"
 */
router.post('/create', createUserController);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users in the database
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *             example:
 *               users:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   age: 25
 *                   createdAt: "2025-11-27T10:00:00.000Z"
 *                   updatedAt: "2025-11-27T10:00:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439012"
 *                   name: "Jane Smith"
 *                   email: "jane.smith@example.com"
 *                   age: 18
 *                   createdAt: "2025-11-27T11:00:00.000Z"
 *                   updatedAt: "2025-11-27T11:00:00.000Z"
 *               message: "Users retrieved successfully"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get('/all', getAllUserController);

/**
 * @swagger
 * /api/users/detail/{userId}:
 *   get:
 *     summary: Get user details by ID
 *     description: Retrieves detailed information about a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User detail retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 25
 *                 createdAt: "2025-11-27T10:00:00.000Z"
 *                 updatedAt: "2025-11-27T10:00:00.000Z"
 *               message: "User detail retrieved successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *             examples:
 *               invalidId:
 *                 value:
 *                   message: "Cast to ObjectId failed"
 */
router.get('/detail/:userId', getUserDetail);

/**
 * @swagger
 * /api/users/update/{userId}:
 *   put:
 *     summary: Update user information
 *     description: Updates an existing user's information (name, email, and/or age)
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *           examples:
 *             updateAll:
 *               value:
 *                 name: "John Doe Updated"
 *                 email: "john.updated@example.com"
 *                 age: 30
 *             updateNameOnly:
 *               value:
 *                 name: "John Updated"
 *             updateEmailOnly:
 *               value:
 *                 email: "new.email@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "John Doe Updated"
 *                 email: "john.updated@example.com"
 *                 age: 30
 *                 createdAt: "2025-11-27T10:00:00.000Z"
 *                 updatedAt: "2025-11-27T12:00:00.000Z"
 *               message: "User updated successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *             examples:
 *               duplicateEmail:
 *                 value:
 *                   message: "E11000 duplicate key error collection"
 *               invalidId:
 *                 value:
 *                   message: "Cast to ObjectId failed"
 */
router.put('/update/:userId', updateUserController);

/**
 * @swagger
 * /api/users/delete/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the database permanently
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *             example:
 *               user:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 25
 *                 createdAt: "2025-11-27T10:00:00.000Z"
 *                 updatedAt: "2025-11-27T10:00:00.000Z"
 *               message: "User deleted successfully"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *             example:
 *               message: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 *             examples:
 *               invalidId:
 *                 value:
 *                   message: "Cast to ObjectId failed"
 */
router.delete('/delete/:userId', deleteUserController);

export default router;