import { Document, Types } from "mongoose";

export interface IStudent extends Document {
     _id: string; // Unique identifier for the course
     username: string;
     email: string;
     password?: string;
     passwordConfirm?: string;
     passwordChangedAt?: Date;
     passwordResetToken?: string;
     passwordResetExpires?: Date;
     role?: string; // Optional because it has a default value
     imageName?: string; // Optional
     profilePicture?: string; // Optional
     enrolledCourses: {
          course: Types.ObjectId;
          progress?: number; // Optional because it has a default value
          completedLessons?: Types.ObjectId[]; // Optional
          enrollmentDate?: Date; // Optional because it has a default value
     }[];
     certificates?: {
          course: Types.ObjectId;
          completionDate?: Date; // Optional
     }[];
     active?: boolean;
     createdAt?: Date; // Optional because it's auto-managed by timestamps
     updatedAt?: Date; // Optional because it's auto-managed by timestamps
}