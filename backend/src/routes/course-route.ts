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
    courseController.createCourse,
    multerController.coursePhoto,
    multerController.courseVideos,
);

// Create a new route for uploaded course videos
courseRouter.route("/:id")
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

export default courseRouter;  