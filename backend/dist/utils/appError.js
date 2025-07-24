"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.NotFoundError = exports.AppError = void 0;
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
    }
    toJSON() {
        return {
            status: this.statusCode >= 500 ? 'error' : 'fail',
            statusCode: this.statusCode,
            message: this.message,
            ...(process.env.NODE_ENV === 'development' && { stack: this.stack })
        };
    }
}
exports.AppError = AppError;
class NotFoundError extends AppError {
    constructor(entity = 'Resource') {
        super(404, `${entity} not found`);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends AppError {
    constructor(errors) {
        super(400, 'Validation failed');
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
//# sourceMappingURL=appError.js.map