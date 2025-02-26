import { Router } from "express";
import { signup, login, getTeachers, getTeacher,  deleteMe, updateMe } from "../controllers/teacher-controller";
import { protect, forgotPassword, resetPassword, updatePassword } from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import { userPhoto, resizeUserPhoto } from "../controllers/multer-controller";
import { validate } from "../controllers/factory";

const teacherRouter = Router();


// teacherRouter.get('/me', authController.getMe, teacherController.getMeData);
teacherRouter.get('/:id', getTeacher);
teacherRouter.get('/', getTeachers);
// teacherRouter.get('/:id/courses', teacherController.getCoursesByTeacher);

teacherRouter.route("/signup").post(signup);
teacherRouter.route("/login").post(login);
// teacherRouter.route("/logout").post(teacherController.logout);


teacherRouter.post('/forgotPassword', forgotPassword(Teachers));
teacherRouter.patch('/resetPassword/:token', resetPassword(Teachers));


teacherRouter.use(protect(Teachers));

teacherRouter.route("/updateMe").patch(
    validate,
    userPhoto,
    resizeUserPhoto,
    updateMe
);

teacherRouter.patch('/updateMyPassword', updatePassword(Teachers));
teacherRouter.route("/deleteMe").delete(deleteMe);





export default teacherRouter;  