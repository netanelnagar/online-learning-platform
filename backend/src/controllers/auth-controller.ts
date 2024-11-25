import { sign, verify } from "jsonwebtoken";
import { IStudent } from "../types/student-types";
import { ITeacher } from "../types/teacher-types";
import { IAdmin } from "../types/admin-types";
import { NextFunction, Request, Response } from "express";
import { Model, Models } from "mongoose";
import catchAsync from "../utils/catch-async";
import { AppError } from "../utils/app-error";
import { promisify } from "util";
import { Admin } from "../models/admin-model";
import config from "../config/config";


const signToken = (id: string) => {
    return sign({ id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
}


const createSendToken = (
    user: IStudent | ITeacher | IAdmin,
    statusCode: number,
    req: Request,
    res: Response) => {
    const token = signToken(user._id!);

    // res.cookie('jwt', token, {
    //     expires: new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //     ),
    //     httpOnly: true,
    //     secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    // });

    user.password = undefined;
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

const signup = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next) => {
    const newUser = new Model(req.body);

    const err = newUser.validateSync();
    if (err) {
        return next(new AppError(err.message, 400));
    }

    await newUser.save();
    // const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url);
    // await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
});

const login = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await Model.findOne({ email }).select('+password');

    // @ts-ignore
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    createSendToken(user, 200, req, res);
});

const signupAdmin = catchAsync(async (req: Request, res: Response, next) => {

    if (req.body.adminPassword !== process.env.ADMIN_PASSWORD) {
        return next(new AppError("You are not authorized", 403));
    }
    const newUser = new Admin(req.body);

    const err = newUser.validateSync();
    if (err) {
        return next(new AppError(err.message, 400));
    }

    await newUser.save();
    // const url = `${req.protocol}://${req.get('host')}/me`;
    // console.log(url);
    // await new Email(newUser, url).sendWelcome();

    createSendToken(newUser, 201, req, res);
});


const protect = (Model: Model<any>) => catchAsync(async (req: Request, res: Response, next) => {

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
    const decoded = await promisify(verify)(token, config.jwtSecret!);

    //@ts-ignore
    const user = await Model.findById(decoded.id);

    if (!user) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //     return next(
    //         new AppError('User recently changed password! Please log in again.', 401)
    //     );
    // }

    //@ts-ignore
    req.user = user;
    res.locals.user = user;
    next();
});


const restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'lead-guide']. role='user'
        //@ts-ignore
        if (!roles.includes(req.user?.role!)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};

export default { signup, login, protect, restrictTo, signupAdmin };