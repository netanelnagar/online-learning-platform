import { NextFunction, Request, Response } from "express";
import { getLogger } from "./winston-logger";

interface IError {
    code?: number;
    message: string;
};

const log = getLogger("catchAllErrors");

function catchAllErrors(err: IError, req: Request, res: Response, next: NextFunction) {
    log.error(`error code: ${err.code || 500}, error message: ${err.message}`);
    if (process.env.MODE === "production") {
        if (err.code) {
            res.status(err.code).send(err.message);
        }
    } else {
        res.status(err.code || 500).send(err.message);
    }
}


export {
    catchAllErrors
}