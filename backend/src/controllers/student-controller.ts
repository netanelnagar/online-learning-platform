import { Students } from "../models/student-model";
import authController from "./auth-controller";
import factory from "./factory";




const signup = authController.signup(Students);
const login = authController.login(Students);
const getStudents = factory.getAll(Students);
const getStudent = factory.getOne(Students);
const updateStudent = factory.updateOne(Students);
const deleteStudent = factory.deleteOne(Students);
const me = factory.me(Students);
const deleteMe = factory.deleteMe(Students);
const updateMe = factory.updateMe(Students);
const validate = factory.validate;


export default {
    signup,
    login,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    deleteMe,
    updateMe,
    validate,
    me
}