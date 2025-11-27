import User from '../models/userModel.js';
// tạo mới 1 user
export const createUser = async (userData) => {
        const user = new User(userData);
        await user.save();
        return user;
};
// lấy tất cả user
export const getAllUser = async () => {
        return await User.find({});
};

// lấy 1 user theo id
export const getUserById = async (userId) => {
        return await User.findById(userId);
};

// cập nhật user theo id
export const updateUserById = async (userId, updateData) => {
        return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// xóa user theo id
export const deleteUserById = async (userId) => {
        return await User.findByIdAndDelete(userId);
};