export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(statusCode: number, message: string, isOperational?: boolean);
    toJSON(): {
        stack?: string | undefined;
        status: string;
        statusCode: number;
        message: string;
    };
}
export declare class NotFoundError extends AppError {
    constructor(entity?: string);
}
export declare class ValidationError extends AppError {
    constructor(errors: Record<string, string>);
    errors: Record<string, string>;
}
//# sourceMappingURL=appError.d.ts.map