import { compare } from "bcryptjs";
import { Response } from "express";
import { Document } from "mongoose";
import { IStudent } from "../types/student-types";
import { ITeacher } from "../types/teacher-types";
import { createHash, randomBytes } from "crypto";

// @ts-ignore
export const chackSamePassword = function (el) {
    // @ts-ignore
    return el === this.password;
}


export const correctPassword = async function (
    candidatePassword: string,
    userPassword: string
): Promise<boolean> {
    return await compare(candidatePassword, userPassword);

}

export const sendRes = function (
    res: Response,
    statusCode: number = 200,
    status: string,
    data?: unknown
) {
    res.status(statusCode).json({ status, data });

}


export const changedPasswordAfter = function (this: IStudent | ITeacher, JWTTimestamp: number) {

    if (this.passwordChangedAt) {
        const changedTimestamp = this.passwordChangedAt.getTime() / 1000;

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

export const createPasswordResetToken = function (this: IStudent | ITeacher) {
    const resetToken = randomBytes(32).toString('hex');

    this.passwordResetToken = createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // @ts-ignore
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};