import { NextFunction, Request, Response } from "express";
import { Reviews } from "../models/review-model";
import factory from "./factory";
import { AppError } from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import { Courses } from "../models/course-model";
import { sendRes } from "../utils/general-functions";
import { getLogger } from "../utils/winston-logger";

const log = getLogger("reviews-controller");

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.body.studentId = req.user?._id;
    const { studentId, courseId } = req.body;

    const review = (await Reviews.find({ studentId, courseId }))[0];

    if (review) throw new AppError('You added review for this course', 400);

    const courses = (await Courses.find({
        studentsEnrolled: { $elemMatch: { studentId } },
    }))[0];

    if (!courses) throw new AppError('You are not enrolled in this course', 400);

    const doc = new Reviews(req.body);
    const err = doc.validateSync();

    if (err) throw new AppError(err.message, 400);

    await doc.save();

    log.info(`create doc in Reviews collection`)

    await Courses.findByIdAndUpdate(courseId
        , { $inc: { "rating.total": req.body.rating, "rating.amount": 1 } }
        , { new: true }
    );

    sendRes(res, 201, "success", req.body);
});

const getReviews = factory.getAll(Reviews);
const deleteReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const docId = req.params.id;

    const doc = await Reviews.findById(docId);

    if (!doc) throw new AppError('No document found with that ID', 404);

    // @ts-ignore
    if (!doc.studentId.equals(req.user?._id)) throw new AppError('You do not have permission to delete this resource.', 403);

    factory.deleteOne(Reviews)(req, res, next);
});


export default {
    createReview,
    getReviews,
    deleteReview
}