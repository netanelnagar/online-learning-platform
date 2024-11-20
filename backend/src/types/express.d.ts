import { Request } from 'express';
import { IStudent } from './student-types';
import { IAdmin } from './admin-types';
import { ITeacher } from './teacher-types';

declare module 'express-serve-static-core' {
    interface Request {
        user?: IStudent | IAdmin | ITeacher;
    }
}
