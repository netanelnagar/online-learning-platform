
export interface IAdmin {
     _id?: string;
     username: string;
     email: string;
     password?: string;
     passwordConfirm?: string;
     role?: string; // Optional because it has a default value
     profilePicture?: string; // Optional
     actions?: {
          actionType?: string; // Optional
          description?: string; // Optional
          timestamp?: Date; // Optional because it has a default value
     }[];
     createdAt?: Date; // Optional because it's automatically managed by timestamps
     updatedAt?: Date; // Optional because it's automatically managed by timestamps
}
