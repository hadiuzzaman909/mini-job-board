export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
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

export class NotFoundError extends AppError {
  constructor(entity = 'Resource') {
    super(404, `${entity} not found`);
  }
}

export class ValidationError extends AppError {
  constructor(errors: Record<string, string>) {
    super(400, 'Validation failed');
    this.errors = errors;
  }
  errors: Record<string, string>;
}