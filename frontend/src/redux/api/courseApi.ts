import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICourse, IEnrolledCorses } from "../../types/types";

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
        getEnrolledCourses: builder.query<{ status: string; data: IEnrolledCorses[] }, string>({
            query: (studentId: string) => ({
                url: `/student/${studentId}`,
                method: "GET",
            }),
        }),
        getCourseById: builder.query<any, string>({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            }),
        }),
        createCourse: builder.mutation({
            query: (data) => {
                const formData = new FormData();

                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("price", data.price);
                formData.append("name", data.name);
                formData.append("teacherId", data.teacherId);
                formData.append("thumbnail", data.thumbnail);
                data.lessons.forEach((lesson: { title: string; video: File; }) => {
                    formData.append("titles", lesson.title);
                    formData.append("videos", lesson.video);
                });

                return {
                    url: "",
                    method: "POST",
                    formData: true,
                    body: formData,
                    Accept: "*/*",
                }
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            },
            invalidatesTags: ["Refetch_Courses"],
            extraOptions: { maxRetries: 0 },
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
        editCourse: builder.mutation<{ status: string; data: ICourse[] }, any>({
            query: (data) => {
                const formData = new FormData();

                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("price", String(data.price));
                formData.append("name", data.name);
                formData.append("teacherId", data.teacherId);
                data.thumbnail && formData.append("thumbnail", data.thumbnail);

                return {
                    url: `/${data._id}`,
                    method: "PATCH",
                    body: formData,
                    formData: true,
                    Accept: "*/*",
                }
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            },
            // invalidatesTags: ["Refetch_Courses"],
        }),

        addLesson: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                console.log(data);
                data.lessons.forEach((lesson: { title: string; video: File; }) => {
                    formData.append("titles", lesson.title);
                    formData.append("videos", lesson.video);
                });

                return {
                    url: `/add-lessons/${data._id}`,
                    method: "PATCH",
                    body: formData,
                    formData: true,
                    Accept: "*/*",
                }
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                } catch (error) {
                    console.log(error);
                }
            },
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
        removeLesson: builder.mutation({
            query: ({ courseId, lessonId }) => ({
                url: `/remove-lesson?course=${String(courseId)}&lesson=${String(lessonId)}`,
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
    useGetEnrolledCoursesQuery,
    useGetCourseByIdQuery,
    useGetSearchCourseQuery,
    useGetPublishedCourseQuery,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useAddLessonMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLessonMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
} = courseApi;
