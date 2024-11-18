import { Teachers } from "../models/teacher-model";
import factory from "./factory";


const createTeacher = factory.createOne(Teachers);

const getTeachers = factory.getAll(Teachers);

export default {
    createTeacher,
    getTeachers
}