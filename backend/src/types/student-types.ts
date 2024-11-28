import { Types } from "mongoose";

export interface IStudent {
     _id?: string;
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
     active?: boolean;
     createdAt?: Date; // Optional because it's auto-managed by timestamps
     updatedAt?: Date; // Optional because it's auto-managed by timestamps
}