import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICourse } from "../../types/types";

const COURSE_API = "http://localhost:3002/api/courses";

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_Courses", "Refetch_Lecture"],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include",
        prepareHeaders: (headers, { getState }) => {
            // @ts-ignore
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCourses: builder.query<{ status: string; data: ICourse[] }, void>({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ["Refetch_Courses"],
        }),
        getCoursesOfTeacher: builder.query<{ status: string; data: ICourse[] }, string>({
            query: (teacherId: string) => ({
                url: `/teacher/${teacherId}`,
                method: "GET",
            }),
            providesTags: ["Refetch_Courses"],
        }),
        getCourseById: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            }),
        }),
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: "",
                method: "POST",
                body: courseData,
                credentials: "include"
            }),
            invalidatesTags: ["Refetch_Courses"],
        }),
        getSearchCourse: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                // Build qiery string
                let queryString = `/search?query=${encodeURIComponent(searchQuery)}`

                // append cateogry 
                if (categories && categories.length > 0) {
                    const categoriesString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoriesString}`;
                }

                // Append sortByPrice is available
                if (sortByPrice) {
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
                }

                return {
                    url: queryString,
                    method: "GET",
                }
            }
        }),
        getPublishedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET",
            }),
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            // providesTags: ["Refetch_Courses"],
        }),
        editCourse: builder.mutation<{ status: string; data: ICourse[] }, ICourse>({
            query: (formData) => ({
                url: `/${formData._id}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Refetch_Courses"],
        }),

        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle },
            }),
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `/${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ["Refetch_Lecture"],
        }),
        editLecture: builder.mutation({
            query: ({
                lectureTitle,
                videoInfo,
                isPreviewFree,
                courseId,
                lectureId,
            }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree },
            }),
        }),
        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Refetch_Lecture"],
        }),
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET",
            }),
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Refetch_Courses"],
        }),
    }),
});
export const {
    useCreateCourseMutation,
    useGetCoursesQuery,
    useGetCoursesOfTeacherQuery,
    useGetCourseByIdMutation,
    useGetSearchCourseQuery,
    useGetPublishedCourseQuery,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
} = courseApi;
