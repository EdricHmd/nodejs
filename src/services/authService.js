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
export const login = async (email, password) => {
  // kiểm tra email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }
  // kiểm tra password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  // tạo token
  const token = generateToken(user._id);
  return { user, token };
};