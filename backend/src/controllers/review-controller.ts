import { Reviews } from "../models/review-model";
import factory from "./factory";


const createReview = factory.createOne(Reviews);

const getReviews = factory.getAll(Reviews);
const updateReview = factory.updateOne(Reviews)

export default {
    createReview,
    getReviews,
    updateReview
}