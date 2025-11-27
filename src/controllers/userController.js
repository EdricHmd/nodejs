import { createUser, getAllUser, getUserById, updateUserById, deleteUserById } from '../services/userService.js';

// [Post] create user
export const createUserController = async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json({ user, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// [Get] get all users
export const getAllUserController = async (req, res) => {
    try {
        const users = await getAllUser();
        res.status(200).json({ users, message: 'Users retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// [Get] get user detail
export const getUserDetail = async (req, res) => {
    try {
        const user = await getUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user, message: 'User detail retrieved successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// [Put] update user
export const updateUserController = async (req, res) => {
    try {
        const user = await updateUserById(req.params.userId, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user, message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// [Delete] delete user
export const deleteUserController = async (req, res) => {
    try {
        const user = await deleteUserById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
