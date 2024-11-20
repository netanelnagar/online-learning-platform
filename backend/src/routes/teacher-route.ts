import { Router } from "express";
import teacherController from "../controllers/teacher-controller";
import authController from "../controllers/auth-controller";
import { Teachers } from "../models/teacher-model";

const teacherRouter = Router();

teacherRouter.route("/signup").post(teacherController.signup);
teacherRouter.route("/login").post(teacherController.login);
// teacherRouter.route("/logout").post(teacherController.logout);



teacherRouter.use(authController.protect(Teachers));

teacherRouter.route("/updateMe").patch(teacherController.updateMe);
teacherRouter.route("/deleteMe").delete(teacherController.deleteMe);





export default teacherRouter;  