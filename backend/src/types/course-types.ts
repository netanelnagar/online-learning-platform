import { Document, Types } from "mongoose";

// Interface for Lesson
export interface ILesson {
    _id?: Types.ObjectId;
    title: string; // Lesson title
    videoName: string; // URL to the video content
    duration?: number; // Optional lesson duration in minutes
}

// Interface for Course
export interface ICourse extends Document {
    _id: Types.ObjectId; // Unique identifier for the course
    title: string; // Course title
    description: string; // Course description
    thumbnail?: string; // Optional thumbnail image URL
    category?: string; // Optional course category
    createdBy: { teacher: Types.ObjectId; name: string; }; // Reference to the teacher who created the course
    lessons: ILesson[]; // Array of lessons in the course
    studentsEnrolled?: { // Optional array of students enrolled in the course
        student: Types.ObjectId; // Reference to the student
        enrollmentDate?: Date; // Optional enrollment date
    }[];
    rating: { // Rating information for the course
        amount: number; // Number of ratings
        total: number; // Total rating score
    };
    price: number; // Price of the course
    published: boolean; // Publication status of the course
    createdAt?: Date; // Automatically added by timestamps
    updatedAt?: Date; // Automatically added by timestamps
}
