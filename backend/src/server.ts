import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './config/logger';
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationRoutes';
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/authRoutes';
import setupSwagger from './config/swagger';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:3000', 
        process.env.NODE_ENV === 'production' ? `https://${process.env.VERCEL_URL}` : '', // Vercel URL
        'https://mini-job-board-oqvc.onrender.com' 
    ].filter(Boolean), 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

connectDB();
setupSwagger(app);

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the Job Board API!',
        documentation: `Visit ${process.env.NODE_ENV === 'production' ? `https://${process.env.Render_URL}/api-docs` : 'http://localhost:5000/api-docs'} for API documentation`,
        endpoints: {
            auth: '/auth',
            jobs: '/jobs',
            applications: '/applications',
        },
    });
});

app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '5000');
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});