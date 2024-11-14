import { Router } from "express";
import reviewController from "../controllers/review-controller";

const reviewRouter = Router();


reviewRouter.route("/").get().post(reviewController.createReview);


export default reviewRouter;