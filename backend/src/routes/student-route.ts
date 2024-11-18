import { Router } from "express";
import studentController from "../controllers/student-controller";

const studentRouter = Router();


studentRouter.route("/")
    .get(studentController.getStudents)
    .post(studentController.createStudent);

studentRouter.route("/updateMe").patch()


//add some middlewares to only admin
studentRouter.route("/:id").patch(studentController.updateStudents);



export default studentRouter;  