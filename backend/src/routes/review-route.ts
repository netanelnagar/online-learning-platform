import { Router } from "express";
import reviewController from "../controllers/review-controller";
import authController from "../controllers/auth-controller";
import { Students } from "../models/student-model";

const reviewRouter = Router();


reviewRouter.route("/")
    .get(reviewController.getReviews);


reviewRouter.use(authController.protect(Students));

reviewRouter.post("/", reviewController.createReview);
reviewRouter.delete("/:id", reviewController.deleteReview)

export default reviewRouter;