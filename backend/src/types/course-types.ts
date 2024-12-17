import { Document, Types } from "mongoose";

// Interface for Lesson
export interface ILesson {
    title: string; // Lesson title
    videoName: string; // URL to the video content
    videoUrl?: string; // URL to the video content
    content?: string; // Optional additional content
    duration?: number; // Optional lesson duration in minutes
    resources?: { // Optional resources associated with the lesson
        type: string; // e.g., "pdf", "link"
        url: string;
    }[];
}

// Interface for Course
export interface ICourse extends Document {
    _id: Types.ObjectId; // Unique identifier for the course
    title: string; // Course title
    description: string; // Course description
    thumbnail?: string; // Optional thumbnail image URL
    category?: string; // Optional course category
    createdBy: Types.ObjectId; // Reference to the teacher who created the course
    lessons: ILesson[]; // Array of lessons in the course
    studentsEnrolled?: { // Optional array of students enrolled in the course
        studentId: Types.ObjectId; // Reference to the student
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
