import { Schema, model } from "mongoose";
import { IStudent } from "../types/student-types";
import validator from "validator";
import { chackSamePassword } from "../utils/general-functions";
import { hash } from "bcryptjs";


const studentSchema = new Schema<IStudent>(
    {
        username: { type: String, required: true, unique: true, lowercase: true },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, '{VALUE} is not a valid email address!']
        },
        password: { type: String, required: true },
        passwordConfirm: {
            type: String,
            required: [true, 'Please confirm your password'],
            validate: [chackSamePassword, 'Passwords are not the same!']

        },
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
                _id: false,
                courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
                progress: { type: Number, default: 0 },
                completedLessons: [{ type: Schema.Types.ObjectId }],
                enrollmentDate: { type: Date, default: Date.now }
            }
        ],
        certificates: [
            {
                _id: false,
                courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
                certificateUrl: { type: String },
                completionDate: { type: Date }
            }
        ],
        active: {
            type: Boolean,
            default: true
        }
    }, {
    timestamps: true,
    autoIndex: true
}
);


studentSchema.pre(/^find/, function (next) {
    // @ts-ignore
    this.find({ active: true })

    // @ts-ignore
    this.populate({
        path: 'certificates.courseId',
        select: 'title description -_id'
    }).populate({
        path: 'enrolledCourses.courseId',
        match: { published: true },
        select: 'title description -_id'
    });

    next();
})

studentSchema.pre("save", async function (next) {
    !this.isModified("password") && next();

    this.password = await hash(this.password, 8);

    this.passwordConfirm = undefined;

    next();
});


export const Students = model<IStudent>('Students', studentSchema, 'Students');



