import { Admin } from "../models/admin-model";
import authController from "./auth-controller";

const signupAdmin = authController.signupAdmin;
const loginAdmin = authController.login(Admin);


export default { signupAdmin, loginAdmin };