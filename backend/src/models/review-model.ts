import { model, Query, Schema } from "mongoose";
import { IReview } from "../types/review-types";
import { getImageUrl } from "../utils/aws";

const reviewSchema = new Schema<IReview>(
     {
          course: { type: Schema.Types.ObjectId, ref: 'Courses', required: true },
          student: { type: Schema.Types.ObjectId, ref: 'Students', required: true },
          rating: { type: Number, required: true, min: 1, max: 5 },
          comment: { type: String },

     },
     {
          timestamps: true,
          toJSON: { virtuals: true },
          toObject: { virtuals: true }
     }
);

// reviewSchema.index({ course: 1, student: 1 }, { unique: true });

reviewSchema.pre<Query<any, IReview>>('find', async function (next) {
     this.populate({
          path: 'student',
          select: 'name imageName -_id'
     });
     this.populate({
          path: 'course',
          select: 'title -_id'
     });
     next();
})

reviewSchema.post<Query<any, IReview>>('find', async function (docs, next) {
     console.log(docs);
     if (this.getOptions().withUrlMedia) {
          if (Array.isArray(docs)) {
               for (const doc of docs) {
                    doc.student.imageName = await getImageUrl(doc.student.imageName);
               }
          } else if (docs) {
               docs.student.imageName = await getImageUrl(docs.student.imageName);
          }
     }
     next();
})




export const Reviews = model<IReview>('Reviews', reviewSchema, 'Reviews');
