import { Router } from "express";
import courseController from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import multerController from "../controllers/multer-controller";
import { Students } from "../models/student-model";

const courseRouter = Router();


courseRouter.get("/", courseController.getCourses);
// courseRouter.get("/:id", courseController.getCourse);

//add pay procces before enrolling
courseRouter.post("/enrollToCourse/:id",
    authController.protect(Students),
    courseController.enrollToCourse
)

courseRouter.use(authController.protect(Teachers))

courseRouter.post("/",
    multerController.courseFiles,
    courseController.createCourse,
    multerController.uploadCoursePhoto,
    // multerController.resizeCourseVideo,
    multerController.uploadCourseVideo,
);

courseRouter.patch("/addLessons/:id",
    multerController.courseFiles,
    courseController.addLessons,
);

// Create a new route for uploaded course videos
courseRouter.route("/:id")
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse)

export default courseRouter;  