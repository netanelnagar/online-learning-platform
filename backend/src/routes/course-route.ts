import { Router } from "express";
import courseController from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import multerController from "../controllers/multer-controller";
import { Students } from "../models/student-model";

const courseRouter = Router();


courseRouter.route("/")
    .get(courseController.getCourses);

//add pay procces before enrolling
courseRouter.post("/enrollToCourse/:id",
    authController.protect(Students),
    courseController.enrollToCourse
)

courseRouter.use(authController.protect(Teachers))

courseRouter.route("/").post(
    multerController.courseFiles,
    courseController.createCourse,
    multerController.uploadCoursePhoto,
    multerController.uploadCourseVideo,
);

// Create a new route for uploaded course videos
courseRouter.route("/:id")
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

export default courseRouter;  