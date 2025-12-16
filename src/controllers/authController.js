import * as authService from '../services/authService.js';
import { success, error } from '../utils/response.js';

// Cấu hình Cookie cho Refresh Token
const COOKIE_OPTIONS = {
  httpOnly: true, // Cookie chỉ đọc từ server, client không truy cập được → tăng bảo mật
  secure: false, // Để false khi chạy local. Lên production (HTTPS) thì set thành true
  sameSite: 'strict', // Giảm nguy cơ tấn công CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000 // Thời gian sống của cookie: 7 ngày
};

// 1. Đăng ký
export const register = async (req, res) => {
  try {
     console.log('Request Body:', req.body); // Debug: log the request body
    const { user, token, refreshToken } = await authService.register(req.body);
    // Lưu refreshToken vào cookie httpOnly
    res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);

    //Trả về user không chứa refreshToken


    return success(res, 'Đăng ký thành công', { 
      user: { id: user._id, email: user.email, name: user.name, role: user.role }, accessToken: token });
  } catch (err) {
    return error(res, err.message, 400, 'REGISTER_FAILED');
  }
};
// 2. Đăng nhập
export const login = async (req, res) => {
  try {
  console.log('Request Body:', req.body); // Debug: log the request body
    const result = await authService.loginUser(req.body);
    
    // Lưu refreshToken vào cookie httpOnly
    res.cookie("refreshToken", result.token.refreshToken, COOKIE_OPTIONS);
    
    return success(res, 'Đăng nhập thành công', { 
      accessToken: result.token.accessToken,
      user: result.user
    });
  } catch (err) {
    return error(res, err.message, 401, 'LOGIN_FAILED');
  }
};
export const refresh = async (req, res) => {
  try {
    // Lấy refresh token từ cookie
    const refreshTokenFromCookie = req.cookies.refreshToken;

    // Gọi service để tạo access token mới
    const tokens = await authService.refreshToken(refreshTokenFromCookie);

    res.status(200).json({
      message: "Lấy token mới thành công",
      accessToken: tokens.accessToken,
    });

  } catch (error) {
    res.status(401).json({ message: error.message });
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
// 3. Controller logout
export const logoutController = async (req, res) => {
  try {
    // Xóa refreshToken trong DB
    await authService.logout(req.user._id);

    // Xóa cookie refreshToken trên browser
    res.clearCookie("refreshToken");

    res.status(200).json({
      message: "Đăng xuất thành công"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Controller quên mật khẩu
export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    return success(res, 'Email sent', result);
  } catch (err) {
    console.log("🚀 ~ forgotPasswordController ~ err:", err)
    return error(res, err.message, 400, 'FORGOT_PASSWORD_FAILED');
  }
};

// 5. Controller đặt lại mật khẩu
export const resetPasswordController = async (req, res) => {
  try {
    await authService.resetPassword(req.params.token, req.body.password);
    return success(res, 'Password updated', null);
  } catch (err) {
    console.log("🚀 ~ resetPasswordController ~ err:", err)
    return error(res, err.message, 400, 'RESET_PASSWORD_FAILED');
  }
};

