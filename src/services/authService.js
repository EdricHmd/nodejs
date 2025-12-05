import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// hàm phụ trợ : tạo token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
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