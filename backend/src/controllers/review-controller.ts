import { NextFunction, Request, Response } from "express";
import { Reviews } from "../models/review-model";
import factory from "./factory";
import { AppError } from "../utils/app-error";
import catchAsync from "../utils/catch-async";


const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.body.studentId = req.user?._id;

    factory.createOne(Reviews)(req, res, next);
});

const getReviews = factory.getAll(Reviews);
const deleteReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const docId = req.params.id;

    const doc = await Reviews.findById(docId);

    console.log(doc, !doc, !Boolean(doc), Boolean(doc));

    if (doc === null) throw new AppError('No document found with that ID', 404);

    // @ts-ignore
    if (!doc.studentId.equals(req.user?._id)) throw new AppError('You do not have permission to delete this resource.', 403);

    factory.deleteOne(Reviews)(req, res, next);
});


export default {
    createReview,
    getReviews,
    deleteReview
}