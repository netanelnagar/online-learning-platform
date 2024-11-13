import { Types } from "mongoose";

export interface IStudent {
     firstName: string;
     lastName: string;
     email: string;
     password: string;
     role?: string; // Optional because it has a default value
     profilePicture?: string; // Optional
     enrolledCourses: {
          courseId: Types.ObjectId;
          progress?: number; // Optional because it has a default value
          completedLessons?: Types.ObjectId[]; // Optional
          enrollmentDate?: Date; // Optional because it has a default value
     }[];
     certificates?: {
          courseId: Types.ObjectId;
          certificateUrl?: string; // Optional
          completionDate?: Date; // Optional
     }[];
     createdAt?: Date; // Optional because it's auto-managed by timestamps
     updatedAt?: Date; // Optional because it's auto-managed by timestamps
}