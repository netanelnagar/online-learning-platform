import { ICourseProgressSchema } from "./course-progress-types";
import { ILesson } from "./course-types"

export interface IEnrolledCorses {
    title: string;
    teacherName: string;
    lessons: ILesson[];
    courseProgress?: ICourseProgressSchema;
}