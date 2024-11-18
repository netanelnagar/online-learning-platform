import { Courses } from "../models/course-model";
import factory from "./factory";

const createCourse = factory.createOne(Courses);

const getCourses = factory.getAll(Courses);
const updateCourses = factory.updateOne(Courses);

export default {
    createCourse,
    getCourses,
    updateCourses
};