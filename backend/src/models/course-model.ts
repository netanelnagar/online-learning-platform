import { model, Schema } from "mongoose";


const lessonSchema = new Schema({
     title: { type: String, required: true },
     videoUrl: { type: String, required: true },
     content: { type: String },
     duration: { type: Number },
     resources: [
          {
               type: { type: String }, // e.g., "pdf", "link"
               url: { type: String }
          }
     ]
});

const courseSchema = new Schema(
     {
          title: { type: String, required: true },
          description: { type: String, required: true },
          thumbnail: { type: String },
          category: { type: String },
          createdBy: { type: Schema.Types.ObjectId, ref: 'Teachers', required: true },
          lessons: [lessonSchema],
          studentsEnrolled: [
               {
                    studentId: { type: Schema.Types.ObjectId, ref: 'Students' },
                    enrollmentDate: { type: Date, default: Date.now }
               }
          ],
          rating: {
               amount: { type: Number, default: 0 },
               total: { type: Number, default: 0 },
          },
          price: { type: Number, default: 0 },
          published: { type: Boolean, default: false }
     },
     { timestamps: true }
);

export const courseModel = model('courseModel', courseSchema, 'Courses');
