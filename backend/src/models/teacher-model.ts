import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
     {
          name: { type: String, required: true }, // Teacher's full name
          email: { type: String, required: true, unique: true }, // Unique email for login
          password: { type: String, required: true }, // Hashed password
          profilePicture: { type: String }, // Optional profile picture URL
          bio: { type: String }, // Short biography about the teacher
          qualifications: [String], // List of teacher's qualifications or certifications
          socialLinks: {             // Links to social profiles or portfolio
               linkedin: { type: String },
               github: { type: String },
               personalWebsite: { type: String }
          },
          courses: [                 // List of courses created by the teacher
               { type: Schema.Types.ObjectId, ref: 'Course' },

          ],
          reviews: [                 // Reviews given to the teacher
               { type: Schema.Types.ObjectId, ref: 'Reviews' }
          ],
          role: {
               type: String,
               enum: {
                    values: ['teacher'],
                    message: '{VALUE} is not a valid role.' // Custom error message
               }
          }, // Role in the system
     },
     { timestamps: true }
);

export const teacherModel = model('teacherModel', teacherSchema, 'Teachers');