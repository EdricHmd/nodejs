import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import {swaggerDocs  } from './swagger.js';
import projectRoutes from './routes/projectRoutes.js';


dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT  || 3001;

connectDB();

app.use(express.json());

swaggerDocs(app);

// Swagger UI

app.use('/api/users', userRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});