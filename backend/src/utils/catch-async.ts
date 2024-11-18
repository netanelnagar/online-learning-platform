import { NextFunction, Request, Response } from "express";

type TFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

const catchAsync = (fn: TFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};




export default catchAsync;