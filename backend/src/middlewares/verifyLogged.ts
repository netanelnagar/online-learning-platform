import { NextFunction, Request, Response } from "express";
import auth from "../utils/auth"
import { AuthorizationError } from "../types/errors-types";

export async function verifyLogged(req: Request, res: Response, next: NextFunction) {
    try {
        const isLogged = await auth.verifyLogged(req);
        if (!isLogged) throw new AuthorizationError("Unauthorized user");

        next();
    } catch (error) {
        next(error);
    }
}


export async function verifyAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const isAdmin = await auth.verifyAdmin(req);
        if (!isAdmin) throw new AuthorizationError("Unauthorized user");
        next();
    } catch (error) {
        next(error);
    }
}


