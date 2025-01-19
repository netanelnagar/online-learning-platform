import { Query, Schema, model } from "mongoose";
import { IStudent } from "../types/student-types";
import validator from "validator";
import { checkSamePassword, changedPasswordAfter, correctPassword, createPasswordResetToken } from "../utils/general-functions";
import { hash } from "bcryptjs";
import aws from "../utils/aws";


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
            validate: [checkSamePassword, 'Passwords are not the same!']

        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        role: {
            type: String,
            enum: {
                values: ['student'],
                message: '{VALUE} is not a valid role.' // Custom error message
            }
        },
        imageName: { type: String },
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
                certificateUrl: String,
                completionDate: Date
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



studentSchema.pre<Query<any, IStudent>>(/^find/, function (next) {

    if (!this.getOptions().overridePublishedFilter) {
        this.find({ active: true });
    }

    this.populate({
        path: 'certificates.courseId',
        select: 'title description -_id'
    }).populate({
        path: 'enrolledCourses.courseId',
        match: { published: true },
        select: 'title description -_id'
    });

    next();
});
studentSchema.post<Query<any, IStudent>>(/^find/, async function (docs, next) {
    if (this.getOptions().withUrlMedia) {
        if (Array.isArray(docs)) {
            for (const doc of docs) {
                doc.profilePicture = doc.imageName ? await aws.getImageUrl(doc.imageName) : "";
                doc.password = undefined;
            }
        } else if (docs) {
            docs.profilePicture = docs.imageName ? await aws.getImageUrl(docs.imageName) : "";
            docs.password = undefined;
        }
    }
    next();
});

studentSchema.post<Query<any, IStudent>>(/^find/, async function (docs, next) {
    if (!this.getOptions().withPassword) {
        if (Array.isArray(docs)) {
            for (const doc of docs) {
                doc.password = undefined;
            }
        } else if (docs) {
            docs.password = undefined;
        }
    }
    next();
});

studentSchema.pre<IStudent>("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hash(this.password!, 8);

    this.passwordConfirm = undefined;

    next();
});

studentSchema.pre<IStudent>('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    // @ts-ignore
    this.passwordChangedAt = Date.now() - 1000;
    next();
});

studentSchema.methods.correctPassword = correctPassword;
studentSchema.methods.changedPasswordAfter = changedPasswordAfter;
studentSchema.methods.createPasswordResetToken = createPasswordResetToken;



export const Students = model<IStudent>('Students', studentSchema, 'Students');



