import { NextFunction, Response } from "express";
import { Courses } from "../models/course-model";
import Stripe from 'stripe';
import catchAsync from "../utils/catch-async";
import { getAll, createOne, updateOne } from "./factory";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import { deleteFileFromS3, deleteFilesFromS3 } from "../utils/aws";
import { IEnrolledCorses } from "../types/general-types";
import { Students } from "../models/student-model";
import { CustomRequest } from "../types/express";
import { uploadCourseVideo } from "./multer-controller";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getCourses = getAll(Courses);

export const getCourseById = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id);
    if (!course) return next(new AppError("Course not found", 404));
    const data = {
        ...course.toObject(),
        studentsEnrolled: course.studentsEnrolled?.length,
        lessons: course.lessons.map(lesson => ({ title: lesson.title, duration: lesson.duration }))
    };
    sendRes(res, 200, "success", data);
});

export const getCoursesOfTeacher = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { teacher } = req.params;
    const courses = await Courses.find({ "createdBy.teacher": teacher }).setOptions({ overridePublishedFilter: true });
    sendRes(res, 200, "success", courses);
});

export const getEnrolledCourses = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { student } = req.params;
    const courses = await Courses.find({ "studentsEnrolled.student": { $in: student } }).setOptions({ withUrlMedia: true });
    const data: IEnrolledCorses[] = courses.map(course => ({
        _id: course._id.toString(),
        title: course.title,
        teacherName: course.createdBy.name,
        lessons: course.lessons,
    }));
    sendRes(res, 200, "success", data);
});

export const createCourse = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    req.body.price = Number(req.body.price);
    req.body.createdBy = { name: req.body.name, teacher: req.body.teacher };
    createOne(Courses, false)(req, res, next);
});

export const updateCourse = updateOne(Courses);


export const deleteCourse = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const course = await Courses.findById(req.params.id);

    if (!course) { throw new AppError('No document found with that ID', 404) };
    if (!course.createdBy.teacher.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    await Courses.findByIdAndDelete(req.params.id);

    course.thumbnail && await deleteFileFromS3(course.thumbnail);

    course.lessons.length && await deleteFilesFromS3(course.lessons)

    sendRes(res, 204, "success", null);
});


export const deleteLesson = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { course: courseId, lesson: lessonId } = req.query;

    if (!courseId || !lessonId) { throw new AppError('Course and lesson IDs are required', 400) }

    const course = await Courses.findById(courseId);

    if (!course) { throw new AppError('No document found with that ID', 404) };

    if (!course.createdBy.teacher.equals(req.user?._id)) { throw new AppError('You do not have permission to delete this resource.', 403) };

    const lesson = course.lessons.find(less => less._id?.equals(lessonId as string));

    if (!lesson) { throw new AppError('No lesson found with that ID', 404) };

    course.lessons = course.lessons.filter(less => !less._id?.equals(lessonId as string))

    await course.save();

    await deleteFileFromS3(lesson.videoName);


    sendRes(res, 204, "success", null);
});

export const enrollToCourse = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await Students.findById(req.user?._id);
    if (!student) { throw new AppError('No document found with that ID', 404) };
    if (student.enrolledCourses.some(course => course.course.equals(id))) { throw new AppError('You are already enrolled in this course', 400) };
    const doc = await Courses.findByIdAndUpdate(id,
        {
            $push: {
                studentsEnrolled: {
                    student: req.user?._id,
                    enrollmentDate: new Date
                }
            }
        },
        { new: true }
    );
    if (!doc) { throw new AppError('No document found with that ID', 404) };
    const user = await Students.findByIdAndUpdate(req.user?._id, { $push: { enrolledCourses: { course: doc._id } } }, { new: true });

    sendRes(res, 201, "success", user);
})


export const getStripe = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const { id } = req.params;

    const course = await Courses.findById(id);

    if (!course) { throw new AppError('No document found with that ID', 404) };

    if (!course.price) {
        return next(new AppError('This course is free, please enroll', 400));
    };

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: course.title
                },
                unit_amount: Math.round(course.price * 100)
            },
            quantity: 1
        }],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/courses/success?course=${id}`,
        cancel_url: `${process.env.FRONTEND_URL}/courses/cancel`,
    });

    sendRes(res, 201, "success", { sessionId: session.id });
})

export const addLessons = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {

    const doc = await Courses.findById(req.params.id);

    if (!doc) { throw new AppError('No document found with that ID', 404) };

    req.body.doc = doc;

    uploadCourseVideo(req, res, next)

})


