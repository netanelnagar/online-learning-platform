export class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    type: string | undefined;
    constructor(message: string, statusCode: number, type?: string) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.type = type;

        Error.captureStackTrace(this, this.constructor);
    }
}