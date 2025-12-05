import * as authService from '../services/authService.js';
import { success, error } from '../utils/response.js';

// 1. Đăng ký
export const register = async (req, res) => {
  try {
     console.log('Request Body:', req.body); // Debug: log the request body
    const { user, token } = await authService.register(req.body);
    return success(res, 'Đăng ký thành công', { user, token });
  } catch (err) {
    return error(res, err.message, 400, 'REGISTER_FAILED');
  }
};
// 2. Đăng nhập
export const login = async (req, res) => {
  try {
  console.log('Request Body:', req.body); // Debug: log the request body
    const user = await authService.loginUser(req.body);
    return success(res, 'Đăng nhập thành công', { user });
  } catch (err) {
    return error(res, err.message, 401, 'LOGIN_FAILED');
  }
};
// 3. Lấy thông tin người dùng (yêu cầu đã đăng nhập)
export const getProfile = async (req, res) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return success(res, 'Lấy thông tin người dùng thành công', user);
  } catch (err) {
    return error(res, err.message, 400, 'GET_PROFILE_FAILED');
  }
};