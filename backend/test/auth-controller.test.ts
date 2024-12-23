import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import authController from '../src/controllers/auth-controller';
import { Admin } from '../src/models/admin-model';
import { AppError } from '../src/utils/app-error';

// FILE: backend/src/controllers/auth-controller.test.ts

vi.mock('jsonwebtoken', () => ({
    sign: vi.fn().mockReturnValue('fake-jwt-token'),
    verify: vi.fn()
}));

vi.mock('mongoose', () => ({
    isValidObjectId: vi.fn().mockReturnValue(true),
    Model: class {
        static findOne = vi.fn();
        static findOneAndUpdate = vi.fn();
        static findById = vi.fn();
        save = vi.fn();
        validateSync = vi.fn();
        createPasswordResetToken = vi.fn().mockReturnValue('reset-token');
    }
}));

vi.mock('crypto', () => ({
    createHash: vi.fn().mockReturnValue({
        update: vi.fn().mockReturnThis(),
        digest: vi.fn().mockReturnValue('hashed-token')
    })
}));

vi.mock('../utils/email', () => {
    return vi.fn().mockImplementation(() => ({
        sendWelcome: vi.fn(),
        sendPasswordReset: vi.fn()
    }));
});

describe('authController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {},
            protocol: 'http',
            get: vi.fn().mockReturnValue('localhost')
        };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        next = vi.fn();
    });

    describe('signupAdmin', () => {
        it('should create a new admin and send a token', async () => {
            req.body = { adminPassword: process.env.ADMIN_PASSWORD, email: 'test@example.com' };
            const newUser = new Admin(req.body);
            Admin.prototype.save = vi.fn().mockResolvedValue(newUser);
            Admin.prototype.validateSync = vi.fn().mockReturnValue(null);

            await authController.signupAdmin(req as Request, res as Response, next);

            expect(Admin.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                status: 'success',
                token: 'fake-jwt-token',
                data: expect.objectContaining({ email: 'test@example.com' })
            }));
        });

        it('should return an error if admin password is incorrect', async () => {
            req.body = { adminPassword: 'wrong-password' };

            await authController.signupAdmin(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(expect.any(AppError));
        });
    });

    describe('login', () => {
        it('should login an existing user and send a token', async () => {
            req.body = { email: 'test@example.com', password: 'password123' };
            const user = new Admin(req.body);
            // @ts-ignore
            user.correctPassword = vi.fn().mockResolvedValue(true);
            Admin.findOne = vi.fn().mockResolvedValue(user);

            await authController.login(Admin)(req as Request, res as Response, next);

            expect(Admin.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                status: 'success',
                token: 'fake-jwt-token',
                data: expect.objectContaining({ email: 'test@example.com' })
            }));
        });

        it('should return an error if email or password is missing', async () => {
            req.body = { email: '', password: '' };

            await authController.login(Admin)(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(expect.any(AppError));
        });

        it('should return an error if email or password is incorrect', async () => {
            req.body = { email: 'test@example.com', password: 'wrong-password' };
            const user = new Admin(req.body);
            // @ts-ignore
            user.correctPassword = vi.fn().mockResolvedValue(false);
            Admin.findOne = vi.fn().mockResolvedValue(user);

            await authController.login(Admin)(req as Request, res as Response, next);

            expect(next).toHaveBeenCalledWith(expect.any(AppError));
        });
    });
});