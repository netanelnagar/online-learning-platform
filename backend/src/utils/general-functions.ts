import { compare } from "bcryptjs";
import { Response } from "express";

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