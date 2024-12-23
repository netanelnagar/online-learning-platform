import { Router } from "express";
import studentController from "../controllers/student-controller";
import authController from "../controllers/auth-controller";
import { Students } from "../models/student-model";
import multerController from "../controllers/multer-controller";

const studentRouter = Router();

studentRouter.post("/signup", studentController.signup);
studentRouter.post("/login", studentController.login);
// studentRouter.route("/logout").post(studentController.logout);

studentRouter.post('/forgotPassword', authController.forgotPassword(Students));
studentRouter.patch('/resetPassword/:token', authController.resetPassword(Students));

studentRouter.use(authController.protect(Students));

studentRouter.get("/me", studentController.me);
studentRouter.route("/updateMe").patch(
    studentController.validate,
    multerController.userPhoto,
    multerController.resizeUserPhoto,
    studentController.updateMe
);
studentRouter.patch('/updateMyPassword', authController.updatePassword(Students));
studentRouter.delete("/deleteMe", studentController.deleteMe);






export default studentRouter;  