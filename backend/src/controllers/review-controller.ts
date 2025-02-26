import { NextFunction, Response } from "express";
import { Reviews } from "../models/review-model";
import { getAll, deleteOne } from "./factory";
import { AppError } from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import { Courses } from "../models/course-model";
import { sendRes } from "../utils/general-functions";
import { getLogger } from "../utils/winston-logger";
import { CustomRequest } from "../types/express";

const log = getLogger("reviews-controller");

export const createReview = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    req.body.student = req.user?._id;
    const { student, course } = req.body;

    const review = (await Reviews.find({ student: student, course: course }))[0];

    if (review) throw new AppError('You added review for this course', 400);

    const courses = (await Courses.find({
        studentsEnrolled: { $elemMatch: { student } },
    }))[0];

    if (!courses) throw new AppError('You are not enrolled in this course', 400);

    const doc = new Reviews(req.body);
    const err = doc.validateSync();

    if (err) throw new AppError(err.message, 400);

    await doc.save();

    log.info(`create doc in Reviews collection`)

    await Courses.findByIdAndUpdate(course
        , { $inc: { "rating.total": req.body.rating, "rating.amount": 1 } }
        , { new: true }
    );

    sendRes(res, 201, "success", req.body);
});

export const getReviews = getAll(Reviews);
export const deleteReview = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const docId = req.params.id;

    const doc = await Reviews.findById(docId);

    if (!doc) throw new AppError('No document found with that ID', 404);

    if (!doc.student.equals(req.user?._id)) throw new AppError('You do not have permission to delete this resource.', 403);

    deleteOne(Reviews)(req, res, next);
});

export const getStudentReview = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== "student") throw new AppError('You are not allowed to access this resource', 401);
    const doc = await Reviews.find({ student: req.user?._id });

    if (!doc) throw new AppError('No document found with that student ID', 404);

    sendRes(res, 200, "success", doc);
});

export const getCourseReview = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const doc = await Reviews.find({ course: req.params.id });

    if (!doc) throw new AppError('No document found with that course ID', 404);

    sendRes(res, 200, "success", doc);
});

