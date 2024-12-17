import { Document } from "mongoose";

export interface IAdmin extends Document {
     _id: string; // Unique identifier for the course
     username: string;
     email: string;
     password?: string;
     passwordConfirm?: string;
     passwordChangedAt?: Date;
     passwordResetToken?: string;
     passwordResetExpires?: Date;
     role?: string; // Optional because it has a default value
     actions?: {
          actionType?: string; // Optional
          description?: string; // Optional
          timestamp?: Date; // Optional because it has a default value
     }[];
     createdAt?: Date; // Optional because it's automatically managed by timestamps
     updatedAt?: Date; // Optional because it's automatically managed by timestamps
}
