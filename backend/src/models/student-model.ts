import { Schema, model } from "mongoose";
import { IStudent } from "../types/student-types";


const studentSchema = new Schema<IStudent>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: {
            values: ['student'],
            message: '{VALUE} is not a valid role.' // Custom error message
        }
    },
    profilePicture: { type: String },
    enrolledCourses: [
        {
            courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
            progress: { type: Number, default: 0 },
            completedLessons: [{ type: Schema.Types.ObjectId }],
            enrollmentDate: { type: Date, default: Date.now }
        }
    ],
    certificates: [
        {
            courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
            certificateUrl: { type: String },
            completionDate: { type: Date }
        }
    ]
}, { timestamps: true });


export const studentModel = model<IStudent>('studentsModel', studentSchema, 'Students');



