import { Router } from "express";
import  { addLessons, createCourse, deleteCourse, enrollToCourse, getCourses, getCoursesOfTeacher, updateCourse } from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import multerController from "../controllers/multer-controller";
import { Students } from "../models/student-model";

const courseRouter = Router();


courseRouter.get("/", getCourses);
courseRouter.get("/teacher/:teacherId", getCoursesOfTeacher);
// courseRouter.get("/:id", courseController.getCourse);

//add pay procces before enrolling
courseRouter.post("/enrollToCourse/:id",
    authController.protect(Students), 
    enrollToCourse
)

courseRouter.use(authController.protect(Teachers))

courseRouter.post("/",
    multerController.courseFiles,
    createCourse,
    multerController.uploadCoursePhoto,
    // multerController.resizeCourseVideo,
    multerController.uploadCourseVideo,
);

courseRouter.patch("/addLessons/:id",
    multerController.courseFiles,
    addLessons,
);

// Create a new route for uploaded course videos
courseRouter.route("/:id")
    .patch(updateCourse)
    .delete(deleteCourse);

export default courseRouter;  