import { Types } from "mongoose";

export interface ILessonsProgress {
    _id: Types.ObjectId;
    lessonId: Types.ObjectId;
    viewed: boolean;
}

export interface ICourseProgressSchema {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    course: Types.ObjectId;
    completed: boolean;
    lessonsProgress: ILessonsProgress[];
}