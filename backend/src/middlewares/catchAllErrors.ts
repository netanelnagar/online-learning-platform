import { NextFunction, Request, Response } from "express";
import { getLogger } from "../utils/winston-logger";
import { sendRes } from "../utils/general-functions";

interface IError {
    statusCode?: number;
    message: string;
};

const log = getLogger("catchAllErrors");

function catchAllErrors(err: IError, req: Request, res: Response, next: NextFunction) {
    console.log(err)
    const { statusCode, message } = err
    log.error(`code: ${statusCode || 500}, message: ${message}`);
    if (process.env.MODE === "production") {
        if (statusCode) {
            sendRes(res, statusCode, "failed", message);
        }
    } else {
        sendRes(res, statusCode || 500, "failed", message);
    }
}


export {
    catchAllErrors
}