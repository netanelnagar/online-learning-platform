import { model, Query, Schema } from "mongoose";
import { ICourse, ILesson } from "../types/course-types";
import { getImageUrl } from "../utils/aws";


const lessonSchema = new Schema<ILesson>({
     title: { type: String, required: true },
     videoName: { type: String, required: true },
     duration: { type: Number, required: true },
}, {
     toObject: { virtuals: true },
     toJSON: { virtuals: true }
});

lessonSchema.virtual('videoUrl');

const courseSchema = new Schema<ICourse>(
     {
          title: { type: String, required: true, lowercase: true, unique: true },
          description: { type: String, required: true },
          thumbnail: { type: String },
          category: { type: String },
          createdBy: {
               teacher: { type: Schema.Types.ObjectId, ref: 'Teachers', required: true },
               name: { type: String, required: true }

          },
          lessons: { type: [lessonSchema], default: [] },
          studentsEnrolled: {
               type: [
                    {
                         _id: false,
                         student: { type: Schema.Types.ObjectId, ref: 'Students' },
                         enrollmentDate: { type: Date, default: Date.now }
                    }
               ], default: []
          },
          rating: {
               amount: { type: Number, default: 0 },
               total: { type: Number, default: 0 },
          },
          price: { type: Number, default: 0 },
          published: { type: Boolean, default: true }
     },
     {
          timestamps: true,
          autoIndex: true
     }
);


courseSchema.virtual('reviews', {
     ref: 'Reviews',
     foreignField: 'course',
     localField: '_id'
});

courseSchema.pre<Query<any, ICourse>>(/^find/, function (next) {
     if (!this.getOptions().overridePublishedFilter) {
          this.find({ published: true });
     }

     if (!this.getOptions().isCreateCourse) {
          this.find({ $where: 'this.lessons.length>0' });
     }
     next();
});

courseSchema.post<Query<any, ICourse>>("find", async function (result, next) {
     if (Array.isArray(result)) {
          for (const doc of result) {
               doc.thumbnail = doc.thumbnail ? await getImageUrl(doc.thumbnail) : "";
          }
     } else if (result) {
          result.thumbnail = result.thumbnail ? await getImageUrl(result.thumbnail) : "";
     }

     next();
})

courseSchema.post<Query<any, ICourse>>("find", async function (result, next) {
     if (this.getOptions().withUrlMedia) {
          if (Array.isArray(result)) {
               for (const doc of result) {
                    for (const lesson of doc.lessons) {
                         lesson.videoUrl = await getImageUrl(lesson.videoName);
                    }
               }
          } else if (result) {
               for (const lesson of result.lessons) {
                    lesson.videoUrl = await getImageUrl(lesson.videoName);
               }
          }
     }

     next();
})



export const Courses = model('Courses', courseSchema, 'Courses');
