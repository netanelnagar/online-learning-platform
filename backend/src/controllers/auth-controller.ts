import { Students } from './../models/student-model';
import { sign, verify } from "jsonwebtoken";
import { IStudent } from "../types/student-types";
import { ITeacher } from "../types/teacher-types";
import { IAdmin } from "../types/admin-types";
import { NextFunction, Response } from "express";
import { Model } from "mongoose";
import catchAsync from "../utils/catch-async";
import { AppError } from "../utils/app-error";
import { promisify } from "util";
import { Admin } from "../models/admin-model";
import { createHash } from "crypto";
import Email from "../utils/email";
import { Teachers } from '../models/teacher-model';
import { CustomRequest } from '../types/express';


const signToken = (id: string) => {
    return sign({ id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
}


export const createSendToken = (
    user: IStudent | ITeacher | IAdmin,
    statusCode: number,
    req: CustomRequest,
    res: Response) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + (Number(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000)
        ),
        httpOnly: true,
        // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        // TODO: deleted this row in production
        secure: true,
        sameSite: 'none'
    });

    user.password = undefined;
    user.passwordConfirm = undefined;
    // @ts-ignore
    user.active = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    // @ts-ignore
    user.__v = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: user
    });
};

export const signup = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next) => {
    const user = await Model.findOne({ email: req.body.email }).setOptions({ overridePublishedFilter: true });

    if (req.originalUrl.includes('students')) {
        delete req.body.enrolledCourses;
        delete req.body.certificates;
    }

    let newUser: IStudent | ITeacher | IAdmin | null;

    newUser = new Model(user ? { ...req.body, _id: user._id } : req.body);

    const err = newUser?.validateSync();
    if (err) {
        return next(new AppError(err.message, 400));
    }

    if (user) {
        if (!user.active) await Model.findOneAndUpdate({ email: user.email }, { ...req.body, active: true }, {
            new: true,
        });
    }
    else { await newUser?.save() };

    const url = `${req.protocol}://${req.get('host')}/me`;

    await new Email(newUser!, url).sendWelcome();

    createSendToken(newUser?.toObject(), 201, req, res);

});

export const login = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await Model.findOne({ email }).setOptions({ withPassword: true });

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user.toObject(), 200, req, res);
});

export const signupAdmin = catchAsync(async (req: CustomRequest, res: Response, next) => {

    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return next(new AppError("You are not authorized", 403));
    }
    const newUser = new Admin(req.body);

    const err = newUser.validateSync();
    if (err) {
        return next(new AppError(err.message, 400));
    }
    await newUser.save();
    const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url);
    await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
});


export const protect = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    //@ts-ignore
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET!);

    //@ts-ignore
    const user = await Model.findById(decoded.id).setOptions({ withUrlMedia: true });

    if (!user) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    //@ts-ignore
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    req.user = user;
    next();
});


export const restrictTo = (...roles: string[]) => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user?.role!)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};


export const updatePassword = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await Model.findById(req.user?._id).select('+password');

    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();


    createSendToken(user, 201, req, res);
});

export const forgotPassword = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const user = await Model.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    try {

        await new Email(user, resetToken).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!', 500),

        );
    }
});


export  const resetPassword = (Model: Model<any>) => catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const hashedToken = createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await Model.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, req, res);
});


export const logout = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.json({ message: "Logged out successfully" });
})

export const autoLogin = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    //@ts-ignore
    const decoded = await promisify(verify)(token, process.env.JWT_SECRET!);

    const data = {
        //@ts-ignore
        admin: Admin.findById(decoded.id).setOptions({ withUrlMedia: true }),
        //@ts-ignore
        student: Students.findById(decoded.id).setOptions({ withUrlMedia: true }),
        //@ts-ignore
        teacher: Teachers.findById(decoded.id).setOptions({ withUrlMedia: true }),
    }

    let user: IStudent | ITeacher | IAdmin | null = await data.admin || await data.student || await data.teacher;

    if (!user) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // @ts-ignore
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    res.status(200).json(user);

});

