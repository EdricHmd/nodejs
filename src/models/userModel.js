import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    age: {
        type: Number,
        default : 18
    },
    password: {
    type: String,
    required: true,
    minlength: 6,
  },
  refreshToken: { 
    type: String, 
    select: false // Mặc định không trả về khi query
    //không  trả về trừ khi ta dùng .select('+refreshToken')
    
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, { timestamps: true });


// 🔒 Middleware: Tự động mã hóa password trước khi lưu
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  //next();
});
// 🔑 Method: Tự so sánh password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = function () {
  // 1. Tạo token ngẫu nhiên (gửi cho user)
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2. Mã hóa token để lưu vào DB
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // 3. Hết hạn sau 10 phút
  this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model('User', userSchema);

export default User;