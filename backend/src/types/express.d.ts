import { Request } from 'express';
import { IStudent } from './student-types';
import { ITeacher } from './teacher-types';
import { IAdmin } from './admin-types';
import type { Document } from 'mongoose';

export interface CustomRequest extends Request {
    user?: IStudent | IAdmin | ITeacher;
    doc?: Document;
}