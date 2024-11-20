import { Teachers } from "../models/teacher-model";
import authController from "./auth-controller";
import factory from "./factory";



const signup = authController.signup(Teachers);
const login = authController.login(Teachers);
const getTeachers = factory.getAll(Teachers);
const getTeacher = factory.getOne(Teachers);
const deleteTeacher = factory.deleteOne(Teachers);

//need to verify if he want to update password
const updateTeacher = factory.updateOne(Teachers);

const deleteMe = factory.deleteMe(Teachers);

const updateMe = factory.updateMe(Teachers);



export default {
    signup,
    login,
    getTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher,
    deleteMe,
    updateMe
}