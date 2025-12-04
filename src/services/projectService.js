import Project from '../models/projectModel.js';

// 1. Tạo Project mới
export const createProject = async (data) => {
//  kiểm tra id owner có tồn tại không nếu có mới cho tạo project mới
  const owner = await User.findById(data.owner);
 // nếu không tồn tại thì báo lỗi
  if (!owner) {
    throw new Error('Owner not found');
  }
  // nếu tồn tại thì tạo project mới
  
  return await Project.create(data);
};

// 2. Lấy tất cả Project (Kèm thông tin người tạo)
export const getAllProjects = async () => {
  // .populate('owner') => Sẽ thay thế ID bằng thông tin user tương ứng
  // 'name email' => Chỉ lấy trường name và email của user đó (bỏ qua password, age...)
  return await Project.find().populate('owner', 'name email');
};

// 3. Lấy chi tiết Project
export const getProjectById = async (id) => {
  return await Project.findById(id).populate('owner', 'name email');
};

// 4. Update & Delete (Giống User)
export const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};