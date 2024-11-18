import { Router } from "express";
import teacherController from "../controllers/teacher-controller";

const teacherRouter = Router();


teacherRouter.route("/").get(teacherController.getTeachers).post(teacherController.createTeacher);


export default teacherRouter;  