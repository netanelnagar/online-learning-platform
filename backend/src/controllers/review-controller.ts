import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catch-async";
import { reviewModel } from "../models/review-model";


const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const review = new reviewModel(req.body);
    const err = review.validateSync();
    if (!err) {
        await review.save();
    } else {
        console.log(err.message)
        throw Error("bad data")
    }
})

export default {
    createReview
}