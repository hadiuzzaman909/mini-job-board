import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './config/logger';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();

app.use(express.json());

connectDB();
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT || '5000');
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
