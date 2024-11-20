import { model, Query, Schema } from "mongoose";
import validator from "validator";
import { ITeacher } from "../types/teacher-types";
import { hash } from "bcryptjs";
import { chackSamePassword, correctPassword } from "../utils/general-functions";

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
          profilePicture: { type: String }, // Optional profile picture URL
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


teacherSchema.pre(/^find/, function (next) {
     // @ts-ignore
     this.find({ active: true })

     next();
})


teacherSchema.pre("save", async function (next) {

     !this.isModified("password") && next();


     this.password = await hash(this.password!, 8);

     this.passwordConfirm = undefined;

     next();
});


teacherSchema.methods.correctPassword = correctPassword;


export const Teachers = model('Teachers', teacherSchema, 'Teachers');