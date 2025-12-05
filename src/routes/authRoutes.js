import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Đăng ký
router.post('/register', register);
// Đăng nhập
router.post('/login', login);
// Lấy thông tin người dùng (cần đăng nhập)
router.get('/profile', protect, getProfile);

export default router;