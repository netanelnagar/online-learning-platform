import { Router } from "express";
import { signupAdmin, loginAdmin } from "../controllers/admin-controller";
import { protect } from "../controllers/auth-controller";
import { Admin } from "../models/admin-model";
import { getStudents, getStudent, updateStudent, deleteStudent } from "../controllers/student-controller";
import { getTeachers, getTeacher, updateTeacher, deleteTeacher } from "../controllers/teacher-controller";

const adminRouter = Router();


adminRouter.post('/signup', signupAdmin);
adminRouter.post('/login', loginAdmin);
// adminRouter.get('/logout', .....);
// adminRouter.delete('/deleteMe', ....);

adminRouter.use(protect(Admin));


adminRouter.route('/students')
    .get(getStudents);
adminRouter.route("/students/:id")
    .get(getStudent)
    .patch(updateStudent)
    .delete(deleteStudent);


adminRouter.route("/teachers")
    .get(getTeachers);
adminRouter.route("/teachers/:id")
    .get(getTeacher)
    .patch(updateTeacher)
    .delete(deleteTeacher);



export default adminRouter;