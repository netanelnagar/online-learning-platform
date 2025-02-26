import { ICourseProgressSchema } from "./course-progress-types";
import { ILesson } from "./course-types"

export interface IEnrolledCorses {
    _id: string;
    title: string;
    teacherName: string;
    lessons: ILesson[];
    courseProgress?: ICourseProgressSchema;
}