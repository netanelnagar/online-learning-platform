import { Router } from "express";
import courseController from "../controllers/course-controller";

const courseRouter = Router();


courseRouter.route("/")
    .get(courseController.getCourses)
    .post(courseController.createCourse);

courseRouter.route("/:id")
    .patch(courseController.updateCourses)

export default courseRouter;  