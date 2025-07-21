import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';  // Use logger for error logging
import AppError from './AppError';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // If error is an instance of AppError, it's an operational error
    if (err instanceof AppError) {
        // Operational error: Send specific message
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Unhandled or programming error
        logger.error(err.stack);  // Log error stack for debugging
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

export default ErrorHandler;
