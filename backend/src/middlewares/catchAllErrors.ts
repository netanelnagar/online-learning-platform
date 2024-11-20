import { NextFunction, Request, Response } from "express";
import { getLogger } from "../utils/winston-logger";

interface IError {
    statusCode?: number;
    message: string;
};

const log = getLogger("catchAllErrors");

function catchAllErrors(err: IError, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    log.error(`error code: ${err.statusCode || 500}, error message: ${err.message}`);
    if (process.env.MODE === "production") {
        if (err.statusCode) {
            res.status(err.statusCode).send(err.message);
        }
    } else {
        res.status(err.statusCode || 500).send(err.message);
    }
}


export {
    catchAllErrors
}