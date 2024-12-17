import { Document, Types } from "mongoose";

// Interface for Teacher Schema
export interface ITeacher extends Document {
    _id: string; // Unique identifier for the course
    username: string; // Teacher's full name (lowercase and unique)
    email: string; // Email (validated as a proper email address)
    password?: string; // Hashed password
    passwordConfirm?: string;
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    imageName?: string; // Optional profile picture URL
    profilePicture?: string; // Optional profile picture URL
    bio?: string; // Optional short biography about the teacher
    qualifications?: string[]; // Optional list of qualifications or certifications
    socialLinks?: { // Optional social links
        linkedin?: string;
        github?: string;
        personalWebsite?: string;
    };
    courses: Types.ObjectId[]; // List of course ObjectIds created by the teacher
    reviews: Types.ObjectId[]; // List of review ObjectIds for the teacher
    role: "teacher"; // Enum role, restricted to "teacher"
    active?: boolean;
    createdAt?: Date; // Automatically managed by timestamps
    updatedAt?: Date; // Automatically managed by timestamps
}
