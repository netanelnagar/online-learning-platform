import { NextFunction, Request, Response } from "express";
import { Courses } from "../models/course-model";
import catchAsync from "../utils/catch-async";
import factory from "./factory";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import aws from "../utils/aws";


const getCourses = factory.getAll(Courses);

const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    req.body.createdBy = req.user?._id;
    req.body.price = Number(req.body.price);
    factory.createOne(Courses, false)(req, res, next);
});

const updateCourse = factory.updateOne(Courses);


const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id);

    if (!course) { throw new AppError('No document found with that ID', 404) };
    // @ts-ignore
    if (!course.createdBy.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    await Courses.findByIdAndDelete(req.params.id);

    course.thumbnail && await aws.deleteFileFromS3(course.thumbnail);

    course.lessons.length && await aws.deleteFilesFromS3(course.lessons)

    sendRes(res, 204, "success", null);
});

const enrollToCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Courses.findByIdAndUpdate(req.params.id,
        {
            $push: {
                studentsEnrolled: {
                    // @ts-ignore
                    studentId: req.user?._id,
                    enrollmentDate: new Date
                }
            }
        },
        { new: true }
    );
    if (!doc) { throw new AppError('No document found with that ID', 404) };

    sendRes(res, 201, "success", "seccessfully enrolled");
})

export default {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    enrollToCourse
};