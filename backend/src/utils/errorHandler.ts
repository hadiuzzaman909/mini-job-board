import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/appError';
import logger from '../config/logger';
import mongoose from 'mongoose';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!(err instanceof AppError) || err.statusCode >= 500) {
    logger.error(
      `${err.name} [${req.method}] ${req.path} >> ` +
      `Message: ${err.message} ${err.stack || ''}`
    );
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.toJSON());
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: 'fail',
      statusCode: 400,
      message: `Invalid ${err.path}: ${err.value}`
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(el => el.message);
    return res.status(400).json({
      status: 'fail',
      statusCode: 400,
      message: 'Validation error',
      errors
    });
  }

  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const value = (err as any).keyValue
      ? Object.values((err as any).keyValue)[0]
      : 'unknown';
    return res.status(400).json({
      status: 'fail',
      statusCode: 400,
      message: `Duplicate field value: ${value}. Please use another value!`
    });
  }


  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'fail',
      statusCode: 401,
      message: 'Invalid token. Please log in again!'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'fail',
      statusCode: 401,
      message: 'Your token has expired! Please log in again.'
    });
  }

  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message, stack: err.stack })
  });
};