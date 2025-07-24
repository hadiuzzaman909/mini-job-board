"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../utils/appError");
const logger_1 = __importDefault(require("../config/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    if (!(err instanceof appError_1.AppError) || err.statusCode >= 500) {
        logger_1.default.error(`${err.name} [${req.method}] ${req.path} >> ` +
            `Message: ${err.message} ${err.stack || ''}`);
    }
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json(err.toJSON());
    }
    if (err instanceof mongoose_1.default.Error.CastError) {
        return res.status(400).json({
            status: 'fail',
            statusCode: 400,
            message: `Invalid ${err.path}: ${err.value}`
        });
    }
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({
            status: 'fail',
            statusCode: 400,
            message: 'Validation error',
            errors
        });
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
        const value = err.keyValue
            ? Object.values(err.keyValue)[0]
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
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map