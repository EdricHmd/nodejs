import * as authService from '../services/authService.js';
import { success, error } from '../utils/response.js';

// 1. Đăng ký
export const register = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);
    return success(res, 'Đăng ký thành công', { user, token });
  } catch (err) {
    return error(res, err.message, 400, 'REGISTER_FAILED');
  }
};
// 2. Đăng nhập
export const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);
    return success(res, 'Đăng nhập thành công', { user, token });
  } catch (err) {
    return error(res, err.message, 401, 'LOGIN_FAILED');
  }
};
// hàm này cần đăng nhập mới được gọi 
export const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return success(res, 'Lấy thông tin người dùng thành công', user);
  } catch (err) {
    return error(res, err.message, 400, 'GET_PROFILE_FAILED');
  }
};

// Dùng khi có lỗi (Mặc định status 400 - Bad Request)
export const error = (res, message, status = 400, errorCode = null) => {
  return res.status(status).json({
    success: false,
    message,
    errorCode,
  });
};