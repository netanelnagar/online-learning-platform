import { NextFunction, Request, Response } from "express";
import { Courses } from "../models/course-model";
import { CourseProgress } from "../models/course-progress-model";

import catchAsync from "../utils/catch-async";
import factory from "./factory";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import aws from "../utils/aws";
import multerController from "./multer-controller";
import { IEnrolledCorses } from "../types/general-types";
import { isValidObjectId } from "mongoose";


export const getCourses = factory.getAll(Courses);

export const getCourseById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id);
    if (!course) return next(new AppError("Course not found", 404));
    const data = {
        ...course.toObject(),
        studentsEnrolled: course.studentsEnrolled?.length,
        lessons: course.lessons.map(lesson => ({ title: lesson.title, duration: lesson.duration }))
    };
    sendRes(res, 200, "success", data);
});

export const getCoursesOfTeacher = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { teacherId } = req.params;
    const courses = await Courses.find({ "createdBy.teacherId": teacherId }).setOptions({ overridePublishedFilter: true });
    sendRes(res, 200, "success", courses);
});

export const getEnrolledCourses = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const courses = await Courses.find({ "studentsEnrolled.studentId": { $in: studentId } });
    const coursesProgress = await CourseProgress.find({ userId: studentId });
    const data: IEnrolledCorses[] = [];
    courses.forEach((course) => data.push({
        title: course.title,
        teacherName: course.createdBy.name,
        lessons: course.lessons,
        courseProgress: coursesProgress.find(c => c.courseId === course._id),
    }))
    sendRes(res, 200, "success", data);
});

export const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.body.price = Number(req.body.price);
    req.body.createdBy = { name: req.body.name, teacherId: req.body.teacherId };
    factory.createOne(Courses, false)(req, res, next);
});

export const updateCourse = factory.updateOne(Courses);


export const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id);

    if (!course) { throw new AppError('No document found with that ID', 404) };
    // @ts-ignore
    if (!course.createdBy.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    await Courses.findByIdAndDelete(req.params.id);

    course.thumbnail && await aws.deleteFileFromS3(course.thumbnail);

    course.lessons.length && await aws.deleteFilesFromS3(course.lessons)

    sendRes(res, 204, "success", null);
});


export const deleteLesson = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log("query.deleteLess")
    const { course: courseId, lesson: lessonId } = req.query;

    if (!courseId || !lessonId) { throw new AppError('Course and lesson IDs are required', 400) }


    const course = await Courses.findById(courseId);

    if (!course) { throw new AppError('No document found with that ID', 404) };
    console.log(course)
    // @ts-ignore
    if (!course.createdBy.teacherId.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    const lesson = course.lessons.find(less => less._id?.equals(lessonId as string));

    if (!lesson) { throw new AppError('No lesson found with that ID', 404) };

    course.lessons = course.lessons.filter(less => !less._id?.equals(lessonId as string))

    await course.save();

    await aws.deleteFileFromS3(lesson.videoName);


    sendRes(res, 204, "success", null);
});

export const enrollToCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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

    sendRes(res, 201, "success", "successfully enrolled");
})

export const addLessons = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const doc = await Courses.findById(req.params.id);

    if (!doc) { throw new AppError('No document found with that ID', 404) };

    req.body.doc = doc;

    multerController.uploadCourseVideo(req, res, next)

})


