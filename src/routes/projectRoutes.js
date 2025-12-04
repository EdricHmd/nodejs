import express from 'express';
import { create, getAll, getDetail, update, remove } from '../controllers/projectController.js';

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     description: Creates a new project with name, description, status, startDate, and owner (user ID)
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *           examples:
 *             fullExample:
 *               value:
 *                 name: "Website Redesign"
 *                 description: "Complete redesign of company website"
 *                 status: "pending"
 *                 startDate: "2025-12-04T10:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *             minimalExample:
 *               value:
 *                 name: "Mobile App Development"
 *                 owner: "507f1f77bcf86cd799439012"
 *     responses:
 *       201:
 *         description: Tạo dự án thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectSuccessResponse'
 *             example:
 *               success: true
 *               message: "Tạo dự án thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website Redesign"
 *                 description: "Complete redesign of company website"
 *                 status: "pending"
 *                 startDate: "2025-12-04T10:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *                 createdAt: "2025-12-04T10:00:00.000Z"
 *                 updatedAt: "2025-12-04T10:00:00.000Z"
 *       500:
 *         description: Lỗi tạo dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectErrorResponse'
 *             examples:
 *               validationError:
 *                 value:
 *                   success: false
 *                   message: "Lỗi tạo dự án"
 *                   errorCode: "Project validation failed: name is required"
 *               invalidOwner:
 *                 value:
 *                   success: false
 *                   message: "Lỗi tạo dự án"
 *                   errorCode: "Cast to ObjectId failed for value"
 */
router.post('/', create);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieves a list of all projects with populated owner information (name and email)
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Lấy danh sách dự án thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectsListResponse'
 *             example:
 *               success: true
 *               message: "Lấy danh sách dự án thành công"
 *               data:
 *                 - _id: "507f1f77bcf86cd799439011"
 *                   name: "Website Redesign"
 *                   description: "Complete redesign of company website"
 *                   status: "in-progress"
 *                   startDate: "2025-12-04T10:00:00.000Z"
 *                   owner:
 *                     _id: "507f1f77bcf86cd799439012"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                   createdAt: "2025-12-04T10:00:00.000Z"
 *                   updatedAt: "2025-12-04T10:00:00.000Z"
 *                 - _id: "507f1f77bcf86cd799439013"
 *                   name: "Mobile App"
 *                   description: "New mobile application"
 *                   status: "pending"
 *                   startDate: "2025-12-05T10:00:00.000Z"
 *                   owner:
 *                     _id: "507f1f77bcf86cd799439014"
 *                     name: "Jane Smith"
 *                     email: "jane.smith@example.com"
 *                   createdAt: "2025-12-05T10:00:00.000Z"
 *                   updatedAt: "2025-12-05T10:00:00.000Z"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectErrorResponse'
 *             example:
 *               success: false
 *               message: "Lỗi hệ thống"
 *               errorCode: "Database connection failed"
 */
router.get('/', getAll);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project details by ID
 *     description: Retrieves detailed information about a specific project with populated owner data
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectSuccessResponse'
 *             example:
 *               success: true
 *               message: "Lấy chi tiết thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website Redesign"
 *                 description: "Complete redesign of company website"
 *                 status: "in-progress"
 *                 startDate: "2025-12-04T10:00:00.000Z"
 *                 owner:
 *                   _id: "507f1f77bcf86cd799439012"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                 createdAt: "2025-12-04T10:00:00.000Z"
 *                 updatedAt: "2025-12-04T10:00:00.000Z"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectNotFoundError'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectErrorResponse'
 *             examples:
 *               invalidId:
 *                 value:
 *                   success: false
 *                   message: "Lỗi hệ thống"
 *                   errorCode: "Cast to ObjectId failed"
 */
router.get('/:id', getDetail);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project information
 *     description: Updates an existing project's information (name, description, status, startDate)
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *         example: "507f1f77bcf86cd799439011"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectUpdateInput'
 *           examples:
 *             updateAll:
 *               value:
 *                 name: "Website Redesign - Phase 2"
 *                 description: "Updated project scope"
 *                 status: "in-progress"
 *                 startDate: "2025-12-05T10:00:00.000Z"
 *             updateStatusOnly:
 *               value:
 *                 status: "completed"
 *             updateNameAndDescription:
 *               value:
 *                 name: "Website Redesign - Final"
 *                 description: "Final phase of redesign"
 *     responses:
 *       200:
 *         description: Cập nhật dự án thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectSuccessResponse'
 *             example:
 *               success: true
 *               message: "Cập nhật dự án thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website Redesign - Phase 2"
 *                 description: "Updated project scope"
 *                 status: "completed"
 *                 startDate: "2025-12-05T10:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *                 createdAt: "2025-12-04T10:00:00.000Z"
 *                 updatedAt: "2025-12-04T15:00:00.000Z"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectNotFoundError'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectErrorResponse'
 *             examples:
 *               invalidId:
 *                 value:
 *                   success: false
 *                   message: "Lỗi hệ thống"
 *                   errorCode: "Cast to ObjectId failed"
 *               invalidStatus:
 *                 value:
 *                   success: false
 *                   message: "Lỗi hệ thống"
 *                   errorCode: "Validation failed: status is not valid"
 */
router.put('/:id', update);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     description: Deletes a project from the database permanently
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the project
 *         example: "507f1f77bcf86cd799439011"
 *     responses:
 *       200:
 *         description: Xóa dự án thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectSuccessResponse'
 *             example:
 *               success: true
 *               message: "Xóa dự án thành công"
 *               data:
 *                 _id: "507f1f77bcf86cd799439011"
 *                 name: "Website Redesign"
 *                 description: "Complete redesign of company website"
 *                 status: "completed"
 *                 startDate: "2025-12-04T10:00:00.000Z"
 *                 owner: "507f1f77bcf86cd799439012"
 *                 createdAt: "2025-12-04T10:00:00.000Z"
 *                 updatedAt: "2025-12-04T10:00:00.000Z"
 *       404:
 *         description: Không tìm thấy dự án
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectNotFoundError'
 *             example:
 *               success: false
 *               message: "Không tìm thấy dự án"
 *               errorCode: "PROJECT_NOT_FOUND"
 *       500:
 *         description: Lỗi hệ thống
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectErrorResponse'
 *             examples:
 *               invalidId:
 *                 value:
 *                   success: false
 *                   message: "Lỗi hệ thống"
 *                   errorCode: "Cast to ObjectId failed"
 */
router.delete('/:id', remove);

export default router;