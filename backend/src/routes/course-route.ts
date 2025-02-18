import { Router } from "express";
import { addLessons, createCourse, deleteCourse, deleteLesson, enrollToCourse, getCourseById, getCourses, getCoursesOfTeacher, getEnrolledCourses, updateCourse } from "../controllers/course-controller";
import authController from "../controllers/auth-controller";
import multerController from "../controllers/multer-controller";
import { Teachers } from "../models/teacher-model";
import { Students } from "../models/student-model";

const courseRouter = Router();


courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/teacher/:teacherId", getCoursesOfTeacher);
// courseRouter.get("/:id", courseController.getCourse);



//add pay procces before enrolling
courseRouter.get("/enrollToCourse/:id",
    authController.protect(Students),
    enrollToCourse
)

courseRouter.get("/student/:studentId",
    authController.protect(Students),
    getEnrolledCourses
)

courseRouter.use(authController.protect(Teachers))

courseRouter.route("/remove-lesson").delete(deleteLesson);

courseRouter.post("/",
    multerController.courseFiles,
    createCourse,
    multerController.uploadCoursePhoto,
    // multerController.resizeCourseVideo,
    multerController.uploadCourseVideo,
);

courseRouter.route("/:id")
    .patch(updateCourse)
    .delete(deleteCourse);



courseRouter.patch("/add-lessons/:id",
    multerController.courseFiles,
    addLessons,
);




export default courseRouter;  