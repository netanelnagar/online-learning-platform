import { Teachers } from "../models/teacher-model";
import { signup as signupAuth, login as loginAuth } from "./auth-controller";
import { getAll, getOne, updateOne, deleteOne, deleteMe as deleteMeFactory, updateMe as updateMeFactory, me as meFactory } from "./factory";



export const signup = signupAuth(Teachers);
export const login = loginAuth(Teachers);
export const getTeachers = getAll(Teachers);
export const getTeacher = getOne(Teachers);
export const deleteTeacher = deleteOne(Teachers);

//need to verify if he want to update password
export const updateTeacher = updateOne(Teachers);
export const deleteMe = deleteMeFactory(Teachers);
export const updateMe = updateMeFactory(Teachers);
export const me = meFactory(Teachers);





