import { Router } from "express";
import teacherController from "../controllers/teacher-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";
import multerController from "../controllers/multer-controller";

const teacherRouter = Router();

teacherRouter.route("/signup").post(teacherController.signup);
teacherRouter.route("/login").post(teacherController.login);
// teacherRouter.route("/logout").post(teacherController.logout);

teacherRouter.post('/forgotPassword', authController.forgotPassword(Teachers));
teacherRouter.patch('/resetPassword/:token', authController.resetPassword(Teachers));


teacherRouter.use(authController.protect(Teachers));

teacherRouter.route("/updateMe").patch(
    teacherController.validate,
    multerController.userPhoto,
    multerController.resizeUserPhoto,
    teacherController.updateMe
);

teacherRouter.patch('/updateMyPassword', authController.updatePassword(Teachers));
teacherRouter.route("/deleteMe").delete(teacherController.deleteMe);





export default teacherRouter;  