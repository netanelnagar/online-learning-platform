import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateEnrollCourses } from "../authSlice";
import { IStudent } from "../../types/types";

const REVIEW_API = `${import.meta.env.VITE_API_URL}/api/reviews`;

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    tagTypes: ["Refetch_Reviews"],
    baseQuery: fetchBaseQuery({
        baseUrl: REVIEW_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        addReview: builder.mutation<void, { course: string; rating: number; review: string }>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Refetch_Reviews"],
        }),
        getReviews: builder.query<{ data: any[] }, void>({
            query: () => ({
                url: `/`,
                method: "GET",
            }),
            providesTags: ["Refetch_Reviews"],
        }),
        getCourseReviews: builder.query({
            query: (course) => ({
                url: `/course/${course}`,
                method: "GET",
            }),
            providesTags: ["Refetch_Reviews"],
        }),
        getStudentReviews: builder.query({
            query: () => ({
                url: `/me`,
                method: "GET",
            }),
            providesTags: ["Refetch_Reviews"],
        }),
    }),
});

export const {
    useAddReviewMutation,
    useGetReviewsQuery,
    useGetCourseReviewsQuery,
    useGetStudentReviewsQuery,
} = reviewApi; 