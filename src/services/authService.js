import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/sendEmail.js';
import dotenv from 'dotenv';

dotenv.config();

// Hàm utility: Tạo Access Token và Refresh Token
export const generateToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
  
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    }
  );
  
  return { accessToken, refreshToken };
};

// 1. Đăng ký
export const register = async (data) => {
  // kiểm tra email đã tồn tại chưa
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }
  // tạo user mới
  const newUser = await User.create(data);

  // tạo token
  const tokens = generateToken(newUser._id);
  
  // Lưu refreshToken vào DB
  newUser.refreshToken = tokens.refreshToken;
  await newUser.save();
  
  return { user: newUser, token: tokens.accessToken, refreshToken: tokens.refreshToken };
};
// 2. Đăng nhập

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  
  // Kiểm tra email
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Kiểm tra password (dùng hàm method của Model)
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Tạo Token
  const tokens = generateToken(user._id);
  
  // Lưu refreshToken vào DB
  user.refreshToken = tokens.refreshToken;
  await user.save();

  return {
    token: tokens,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
};

// 3. Lấy thông tin người dùng
export const getProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
// 3. Refresh Token (Cấp lại Access Token mới)
export const refreshToken = async (refreshTokenFromCookie) => {
  // Kiểm tra refresh token có tồn tại hay không
  if (!refreshTokenFromCookie) {
    throw new Error("Refresh token không tồn tại");
  }

  let decoded;
  try {
    // Verify token
    decoded = jwt.verify(
      refreshTokenFromCookie,
      process.env.JWT_REFRESH_SECRET
    );
    console.log('Decoded Refresh Token:', decoded); // Debug: log the decoded token
  } catch (error) {
    console.log(error);
    throw new Error("Refresh token không hợp lệ hoặc đã hết hạn");
  }

  // Check trong DB xem token này còn hiệu lực (khớp với DB) không
  
  const user = await User.findById(decoded.id).select("+refreshToken");
  console.log('User from DB:', user); // Debug: log the user fetched from DB
  if (!user || user.refreshToken !== refreshTokenFromCookie) {
    throw new Error("Refresh token không hợp lệ");
  }

  // Tạo access token mới
  const newAccessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE,
    }
  );

  return {
    accessToken: newAccessToken,
  };
};
export const logout = async (userId) => {
  // Xóa refresh token trong DB
  await User.findByIdAndUpdate(userId, {
    refreshTokens: "", // Hoặc null
  });
};

// Logic Quên mật khẩu
export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  // Tạo token đặt lại mật khẩu
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // tạo link
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  // Nội dung HTML
  const messageMail = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Yêu cầu đặt lại mật khẩu</h2>
      <p>Bạn nhận được email này vì chúng tôi nhận được yêu cầu đổi mật khẩu cho tài khoản của bạn.</p>
      <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
      <p>Hoặc copy link này: ${resetUrl}</p>
      <p>Link hết hạn sau 10 phút.</p>
    </div>
  `;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      html : messageMail
    });
     return { message: 'Email sent' };
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    throw new Error('Email could not be sent');
  }
};

// 2. Logic Reset Password (Không đổi)
export const resetPassword = async (resetToken, newPassword) => {
  // Mã hóa token để so sánh với DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // Tìm user theo token và kiểm tra token còn hạn không
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error('Invalid or expired token');
  }
  // Cập nhật mật khẩu mới
  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  return { message: 'Password updated' };
};
