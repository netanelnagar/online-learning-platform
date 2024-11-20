import { Router } from "express";
import adminController from "../controllers/admin-controller";
import authController from "../controllers/auth-controller";
import { Admin } from "../models/admin-model";
import studentController from "../controllers/student-controller";
import teacherController from "../controllers/teacher-controller";

const adminRouter = Router();


adminRouter.post('/signup', adminController.signupAdmin);
adminRouter.post('/login', adminController.loginAdmin);
// adminRouter.get('/logout', .....);
// adminRouter.delete('/deleteMe', ....);

adminRouter.use(authController.protect(Admin));


adminRouter.route('/students')
    .get(studentController.getStudents);
adminRouter.route("/students/:id")
    .get(studentController.getStudent)
    .patch(studentController.updateStudent)
    .delete(studentController.deleteStudent);


adminRouter.route("/teachers")
    .get(teacherController.getTeachers);
adminRouter.route("/teachers/:id")
    .get(teacherController.getTeacher)
    .patch(teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher);



export default adminRouter;