import { Types } from "mongoose";

// Define the TypeScript interface for the Admin schema
export interface IAdmin {
     name: string;
     email: string;
     password: string;
     salt: string;
     role?: string; // Optional because it has a default value
     profilePicture?: string; // Optional
     actions?: {
          actionType?: string; // Optional
          targetId?: Types.ObjectId; // Optional
          description?: string; // Optional
          timestamp?: Date; // Optional because it has a default value
     }[];
     createdAt?: Date; // Optional because it's automatically managed by timestamps
     updatedAt?: Date; // Optional because it's automatically managed by timestamps
}
