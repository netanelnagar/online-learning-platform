import { Router } from "express";
import reviewController from "../controllers/review-controller";

const reviewRouter = Router();


reviewRouter.route("/")
    .get(reviewController.getReviews)
    .post(reviewController.createReview);


reviewRouter.route("/:id").patch(reviewController.updateReview)

export default reviewRouter;