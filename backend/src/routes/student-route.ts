import { Router } from "express";
import studentController from "../controllers/student-controller";
import authController from "../controllers/auth-controller";
import { Students } from "../models/student-model";
import multerController from "../controllers/multer-controller";

const studentRouter = Router();

studentRouter.route("/signup").post(studentController.signup);
studentRouter.route("/login").post(studentController.login);
// studentRouter.route("/logout").post(studentController.logout);

studentRouter.use(authController.protect(Students));

studentRouter.route("/updateMe").patch(
    studentController.validate,
    multerController.userPhoto,
    multerController.resizeUserPhoto,
    studentController.updateMe
);
studentRouter.route("/deleteMe").delete(studentController.deleteMe);






export default studentRouter;  