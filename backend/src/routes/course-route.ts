import { Router } from "express";
import courseController from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";

const courseRouter = Router();


courseRouter.route("/")
    .get(courseController.getCourses);


courseRouter.use(authController.protect(Teachers))

courseRouter.route("/").post(courseController.createCourse);

courseRouter.route("/:id")
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

export default courseRouter;  