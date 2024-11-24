import { Router } from "express";
import courseController from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import multerController from "../controllers/multer-controller";

const courseRouter = Router();


courseRouter.route("/")
    .get(courseController.getCourses);


courseRouter.use(authController.protect(Teachers))

courseRouter.route("/").post(
    multerController.uploadCourse,
    multerController.uploadCourseVideo,
    courseController.createCourse
);

courseRouter.route("/:id")
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

export default courseRouter;  