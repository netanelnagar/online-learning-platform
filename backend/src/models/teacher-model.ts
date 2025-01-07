import { model, Query, Schema } from "mongoose";
import validator from "validator";
import { ITeacher } from "../types/teacher-types";
import { hash } from "bcryptjs";
import { chackSamePassword, changedPasswordAfter, correctPassword, createPasswordResetToken } from "../utils/general-functions";
import aws from "../utils/aws";

const teacherSchema = new Schema<ITeacher>(
     {
          username: { type: String, required: true, unique: true, lowercase: true }, // Teacher's full name
          email: {
               type: String,
               required: true,
               unique: true,
               validate: [validator.isEmail, '{VALUE} is not a valid email address!']
          },
          password: { type: String, required: true }, // Hashed password
          passwordConfirm: {
               type: String,
               required: [true, 'Please confirm your password'],
               validate: [chackSamePassword, 'Passwords are not the same!']

          },
          passwordChangedAt: Date,
          passwordResetToken: String,
          passwordResetExpires: Date,
          imageName: { type: String }, // Optional profile picture URL
          profilePicture: { type: String },
          bio: { type: String }, // Short biography about the teacher
          qualifications: [String], // List of teacher's qualifications or certifications
          socialLinks: {             // Links to social profiles or portfolio
               linkedin: { type: String },
               github: { type: String },
               personalWebsite: { type: String }
          },
          role: {
               type: String,
               enum: {
                    values: ['teacher'],
                    message: '{VALUE} is not a valid role.' // Custom error message
               }
          },
          active: {
               type: Boolean,
               default: true
          }
     },
     {
          timestamps: true,
          autoIndex: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true }
     }
);


teacherSchema.virtual('courses', {
     ref: 'Courses',
     foreignField: 'createdBy',
     localField: '_id'
});

teacherSchema.pre<Query<any, ITeacher>>(/^find/, function (next) {
     if (!this.getOptions().overridePublishedFilter) {
          this.find({ active: true });
     }
     next();
});

teacherSchema.post<Query<any, ITeacher>>(/^find/, async function (docs, next) {
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
     } else {
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

teacherSchema.pre<ITeacher>("save", async function (next) {

     if (!this.isModified("password")) return next();


     this.password = await hash(this.password!, 8);

     this.passwordConfirm = undefined;

     next();
});

teacherSchema.pre<ITeacher>('save', function (next) {
     if (!this.isModified('password') || this.isNew) return next();
     // @ts-ignore
     this.passwordChangedAt = Date.now() - 1000;
     next();
});

teacherSchema.methods.correctPassword = correctPassword;
teacherSchema.methods.changedPasswordAfter = changedPasswordAfter;
teacherSchema.methods.createPasswordResetToken = createPasswordResetToken;


export const Teachers = model('Teachers', teacherSchema, 'Teachers');