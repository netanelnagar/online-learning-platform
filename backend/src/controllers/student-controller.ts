import { Students } from "../models/student-model";
import factory from "./factory";


const createStudent = factory.createOne(Students);

const getStudents = factory.getAll(Students);
const updateStudents = factory.getAll(Students);

export default {
    createStudent,
    getStudents,
    updateStudents
}