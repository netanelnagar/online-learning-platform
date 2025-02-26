import catchAsync from "../utils/catch-async";
import { Students } from "../models/student-model";
import { signup as signupAuth, login as loginAuth } from "./auth-controller";
import { getAll, getOne, updateOne, deleteOne, deleteMe as deleteMeFactory, updateMe as updateMeFactory, me as meFactory } from "./factory";
import { NextFunction, Response } from "express";
import { AppError } from "../utils/app-error";
import { sendRes } from "../utils/general-functions";
import { CustomRequest } from "../types/express";




export const signup = signupAuth(Students);
export const login = loginAuth(Students);
export const getStudents = getAll(Students);
export const getStudent = getOne(Students);
export const updateStudent = updateOne(Students);
export const deleteStudent = deleteOne(Students);
export const me = meFactory(Students);
export const deleteMe = deleteMeFactory(Students);
export const updateMe = updateMeFactory(Students);

export const updateWatchedLessons = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { course, lessonId } = req.body;
    if (!course || !lessonId) {
        throw new AppError('Course ID and lesson ID are required', 400);
    }

    const user = await Students.findByIdAndUpdate(
        req.user?._id,
        {
            $push: {
                "enrolledCourses.$[course].completedLessons": lessonId
            }
        },
        {
            arrayFilters: [{ "course.course": course }],
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        throw new AppError('No document found with that ID', 404);
    }

    sendRes(res, 200, "Watched lesson updated successfully", user);
})

export const completionCourse = catchAsync(async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { course } = req.params;
    if (!course) {
        throw new AppError('Course ID is required', 400);
    }

    const existingCert = await Students.findOne({
        _id: req.user?._id,
        'certificates.course': course
    });

    if (existingCert) {
        throw new AppError("Certificate already exists for this course", 400);
    }

    const cert = {
        course,
        completionDate: Date.now()
    }

    await Students.findByIdAndUpdate(
        req.user?._id,
        {
            $push: { certificates: cert }
        }
    );
    sendRes(res, 200, "Course completed successfully", cert);

})

