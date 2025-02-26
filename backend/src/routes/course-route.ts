import { Router } from "express";
import { addLessons, createCourse, deleteCourse, deleteLesson, enrollToCourse, getCourseById, getCourses, getCoursesOfTeacher, getEnrolledCourses, getStripe, updateCourse } from "../controllers/course-controller";
import { protect } from "../controllers/auth-controller";
import { courseFiles, uploadCoursePhoto, uploadCourseVideo } from "../controllers/multer-controller";
import { Teachers } from "../models/teacher-model";
import { Students } from "../models/student-model";
import { completionCourse, updateWatchedLessons } from "../controllers/student-controller";

const courseRouter = Router();


courseRouter.get("/", getCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.get("/teacher/:teacher", getCoursesOfTeacher);
// courseRouter.get("/:id", courseController.getCourse);

courseRouter.post("/stripe/:id",
    protect(Students),
    getStripe
)

courseRouter.post("/enroll-to-course/:id",
    protect(Students),
    enrollToCourse
)

courseRouter.get("/student/:student",
    protect(Students),
    getEnrolledCourses
)
courseRouter.post("/update-watched-lesson",
    protect(Students),
    updateWatchedLessons
);

courseRouter.post("/completion-course/:course",
    protect(Students),
    completionCourse
);

courseRouter.use(protect(Teachers))

courseRouter.route("/remove-lesson").delete(deleteLesson);

courseRouter.post("/",
    courseFiles,
    createCourse,
    uploadCoursePhoto,
    // multerController.resizeCourseVideo,
    uploadCourseVideo,
);

courseRouter.route("/:id")
    .patch(courseFiles, updateCourse)
    .delete(deleteCourse);



courseRouter.patch("/add-lessons/:id",
    courseFiles,
    addLessons,
);




export default courseRouter;  