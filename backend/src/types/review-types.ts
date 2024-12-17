import { Document, Types } from "mongoose";

// Define the TypeScript interface for the Review schema
export interface IReview extends Document {
     _id: Types.ObjectId; // Unique identifier for the course
     courseId: Types.ObjectId; // References a Course document
     studentId: Types.ObjectId; // References a Student document
     rating: number; // A number between 1 and 5
     comment?: string; // Optional comment on the review
     createdAt?: Date; // Optional because it's auto-managed by timestamps
     updatedAt?: Date; // Optional because it's auto-managed by timestamps
}
