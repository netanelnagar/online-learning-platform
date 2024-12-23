import { describe, it, expect, vi, beforeEach } from 'vitest';
import nodemailer from 'nodemailer';
import Email from '../src/utils/email';
import { IAdmin } from '../src/types/admin-types';

vi.mock('nodemailer', () => ({
    createTransport: vi.fn()
}));

describe('Email', () => {
    let email: Email;
    let user: IAdmin;

    beforeEach(() => {
        user = {
            email: 'test@example.com',
            username: 'Test User',
            _id: '12345'
        } as IAdmin;
        email = new Email(user, 'test-token');
    });

    describe('newTransport', () => {
        it('should create a SendGrid transport if in production mode', () => {
            process.env.Mode = 'production';
            process.env.SENDGRID_USERNAME = 'sendgrid_user';
            process.env.SENDGRID_PASSWORD = 'sendgrid_pass';

            email.newTransport();

            expect(nodemailer.createTransport).toHaveBeenCalledWith({
                service: 'SendGrid',
                auth: {
                    user: 'sendgrid_user',
                    pass: 'sendgrid_pass'
                }
            });
        });

        it('should create a default transport if not in production mode', () => {
            process.env.Mode = 'development';
            process.env.EMAIL_HOST = 'smtp.mailtrap.io';
            process.env.EMAIL_PORT = '2525';
            process.env.EMAIL_USERNAME = 'mailtrap_user';
            process.env.EMAIL_PASSWORD = 'mailtrap_pass';

            email.newTransport();

            expect(nodemailer.createTransport).toHaveBeenCalledWith({
                host: 'smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: 'mailtrap_user',
                    pass: 'mailtrap_pass'
                }
            });
        });
    });
});