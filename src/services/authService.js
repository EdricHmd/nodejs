import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

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
  const token = generateToken(newUser._id);
  return { user: newUser, token };
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
  const token = generateToken(user._id);

  return {
    token,
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
  } catch (error) {
    throw new Error("Refresh token không hợp lệ hoặc đã hết hạn");
  }

  // Check trong DB xem token này còn hiệu lực (khớp với DB) không
  const user = await User.findById(decoded.id).select("+refreshTokens");
  if (!user || user.refreshTokens !== refreshTokenFromCookie) {
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