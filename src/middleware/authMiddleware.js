import jwt from 'jsonwebtoken';
import {error} from '../utils/response.js';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  // kiểm tra xem header có gửi token không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy chuỗi token phía sau chữ "Bearer "
      token = req.headers.authorization.split(' ')[1];
      // Giải mã token để lấy thông tin user
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      // Lấy thông tin user từ DB
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (err) {
      return error(res, 'Token không hợp lệ hoặc đã hết hạn', 401, 'TOKEN_INVALID');
    }
  }
  if (!token) {
    return error(res, 'Bạn chưa đăng nhập', 401, 'NOT_AUTHORIZED');
  }
};