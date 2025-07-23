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
// Enable CORS
app.use(cors());

app.use(express.json());

connectDB();
setupSwagger(app);

app.use('/auth', authRoutes);

app.use('/jobs', jobRoutes);  
app.use('/applications', applicationRoutes);  

app.use(errorHandler);

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the Job Board API!',
        documentation: 'Visit https://mini-job-board-oqvc.onrender.com/api for API documentation',
        endpoints: {
            auth: '/auth',
            jobs: '/jobs',
            applications: '/applications',
        },
    });
});

const PORT: number = parseInt(process.env.PORT || '5000');
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
