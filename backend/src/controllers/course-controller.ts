import { NextFunction, Request, Response } from "express";
import { Courses } from "../models/course-model";
import catchAsync from "../utils/catch-async";
import factory from "./factory";
import { AppError } from "../utils/app-error";


const getCourses = factory.getAll(Courses);

const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.body.createdBy = req.user?._id;
    factory.createOne(Courses)(req, res, next);
});

const updateCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Courses.findById(req.params.id);

    if (!doc) throw new AppError('No document found with that ID', 404);
    // @ts-ignore
    if (!doc.createdBy.equals(req.user?._id)) throw new AppError('You do not have permission to delete this resource.', 403);

    factory.updateOne(Courses)(req, res, next);
});


const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Courses.findById(req.params.id);
    console.log(req.params.id, doc, !doc, !Boolean(doc), Boolean(doc));


    if (doc === null) { throw new AppError('No document found with that ID', 404) };
    // @ts-ignore
    if (!doc.createdBy.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    factory.deleteOne(Courses)(req, res, next);
});;

export default {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse
};