import { MouseEventHandler } from "react";
import { IStudent } from "../types/types";

export const stopBubbling: MouseEventHandler<HTMLElement> = e => e.stopPropagation();


export const isEnrolled = (course: string, enrolledCourses: IStudent['enrolledCourses']) => {
    return enrolledCourses.some((course) => course.course === course);
}