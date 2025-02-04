import { Schema } from "mongoose";
import { model } from "mongoose";
import { ICourseProgressSchema, ILessonsProgress } from "../types/course-progress-types";


const lessonsProgressSchema = new Schema<ILessonsProgress>({
    lessonId: { type: Schema.Types.ObjectId, ref: 'Courses' },
    viewed: { type: Boolean }
});

const courseProgressSchema = new Schema<ICourseProgressSchema>({
    userId: { type: Schema.Types.ObjectId, ref: 'Students' },
    courseId: { type: Schema.Types.ObjectId, ref: 'Courses' },
    completed: { type: Boolean },
    lessonsProgress: [lessonsProgressSchema]
});

export const CourseProgress = model("CourseProgress", courseProgressSchema, "CourseProgress");