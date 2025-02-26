import { Admin } from "../models/admin-model";
import { signupAdmin as signupAuth, login as loginAuth } from "./auth-controller";


export const signupAdmin = signupAuth;
export const loginAdmin = loginAuth(Admin);


