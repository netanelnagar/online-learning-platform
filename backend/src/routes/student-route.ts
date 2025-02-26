import { Router } from "express";
import { signup, login,  deleteMe, updateMe, me } from "../controllers/student-controller";
import { protect, forgotPassword, resetPassword, updatePassword } from "../controllers/auth-controller";
import { Students } from "../models/student-model";
import { userPhoto, resizeUserPhoto } from "../controllers/multer-controller";
import { validate } from "../controllers/factory";

const studentRouter = Router();

studentRouter.post("/signup", signup);
studentRouter.post("/login", login);
// studentRouter.route("/logout").post(studentController.logout);

studentRouter.post('/forgotPassword', forgotPassword(Students));
studentRouter.patch('/resetPassword/:token', resetPassword(Students));

studentRouter.use(protect(Students));

studentRouter.get("/me", me);
studentRouter.route("/updateMe").patch(
    validate,
    userPhoto,
    resizeUserPhoto,
    updateMe
);
studentRouter.patch('/updateMyPassword', updatePassword(Students));
studentRouter.delete("/deleteMe", deleteMe);



export default studentRouter;  