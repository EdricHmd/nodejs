import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import {swaggerDocs  } from './swagger.js';
import projectRoutes from './routes/projectRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 


dotenv.config();

const app = express();

// Cách 1: Cho phép tất cả (Dễ tính - Dùng khi Dev)
// Frontend ở port nào cũng gọi được
app.use(
  cors({
    origin: "*", // cho public toàn bộ
    credentials: true, // cho phép cookie nếu cần
  })
);

// Cách 2: Chỉ cho phép domain cụ thể (Dùng khi Production)
/*
app.use(cors({
  origin: 'http://localhost:5173', // Chỉ cho phép Frontend React ở port 5173 gọi
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Cho phép gửi cookie nếu cần
}));
*/

app.use(express.json());
const PORT = process.env.PORT  || 3001;

connectDB();

app.use(express.json());
app.use(cookieParser());

swaggerDocs(app);

// Swagger UI

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});