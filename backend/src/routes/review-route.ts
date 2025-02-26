import { Router } from "express";
import { getStudentReview, getReviews, deleteReview, createReview, getCourseReview } from "../controllers/review-controller";
import { Students } from "../models/student-model";
import { protect } from "../controllers/auth-controller";


const reviewRouter = Router();


reviewRouter.route("/")
    .get(getReviews);

reviewRouter.get("/course/:id", getCourseReview);

reviewRouter.use(protect(Students));

reviewRouter.post("/", createReview);
reviewRouter.route("/:id").delete(deleteReview)
reviewRouter.get("/me", getStudentReview);

export default reviewRouter;