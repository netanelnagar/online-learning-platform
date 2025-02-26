import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICourse, IEnrolledCorses, IStudent } from "../../types/types";
import { updateCertificate, updateEnrollCourses } from "../authSlice";

const COURSE_API = `${import.meta.env.VITE_API_URL}/api/courses`;

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ["Refetch_Courses", "Refetch_Lecture", "Refetch_Courses_For_Teacher"],
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
            query: (teacher: string) => ({
                url: `/teacher/${teacher}`,
                method: "GET",
            }),
            providesTags: ["Refetch_Courses"],
        }),
        getEnrolledCourses: builder.query<{ status: string; data: IEnrolledCorses[] }, string>({
            query: (student: string) => ({
                url: `/student/${student}`,
                method: "GET",
            }),
        }),
        getCourseById: builder.query<any, string>({
            query: (course) => ({
                url: `/${course}`,
                method: "GET",
            }),
            providesTags: ["Refetch_Courses_For_Teacher"],
        }),
        createCourse: builder.mutation({
            query: (data) => {
                const formData = new FormData();

                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("price", data.price);
                formData.append("name", data.name);
                formData.append("category", data.category);
                formData.append("teacher", data.teacher);
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
        updateWatchedLesson: builder.mutation<{ status: string; data: any }, { course: string; lessonId: string }>({
            query: ({ course, lessonId }) => ({
                url: `/update-watched-lesson`,
                method: "POST",
                body: { course, lessonId },
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    dispatch(updateEnrollCourses({ data: result.data.data }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        completionCourse: builder.mutation<{ status: string; data: any }, string>({
            query: (course) => ({
                url: `/completion-course/${course}`,
                method: "POST",
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    dispatch(updateCertificate(result.data.data));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        editCourse: builder.mutation<{ status: string; data: ICourse[] }, any>({
            query: (data) => {
                const formData = new FormData();

                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("price", String(data.price));
                formData.append("name", data.name);
                formData.append("teacher", data.teacher);
                formData.append("category", data.category);
                data.thumbnail && formData.append("thumbnail", data.thumbnail);

                console.log(data);

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
            invalidatesTags: ["Refetch_Courses_For_Teacher"],
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
            query: (course) => ({
                url: `/${course}/lecture`,
                method: "GET",
            }),
            providesTags: ["Refetch_Lecture"],
        }),
        editLecture: builder.mutation({
            query: ({
                lectureTitle,
                videoInfo,
                isPreviewFree,
                course,
                lectureId,
            }) => ({
                url: `/${course}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree },
            }),
        }),
        removeLesson: builder.mutation({
            query: ({ course, lessonId }) => ({
                url: `/remove-lesson?course=${String(course)}&lesson=${String(lessonId)}`,
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
            query: ({ course, query }) => ({
                url: `/${course}?publish=${query}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Refetch_Courses"],
        }),
        enrollCourse: builder.query<{ data: IStudent }, string>({
            query: (course) => ({
                url: `/enroll-to-course/${course}`,
                method: 'POST',
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    dispatch(updateEnrollCourses({ data: result.data.data }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        addReview: builder.mutation({
            query: (data) => ({
                url: `/add-review`,
                method: 'POST',
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    dispatch(updateEnrollCourses({ data: result.data.data }));
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        getReviews: builder.query({
            query: (course) => ({
                url: `/reviews/${course}`,
                method: "GET",
            }),
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
    useUpdateWatchedLessonMutation,
    useCompletionCourseMutation,
    useEditCourseMutation,
    useAddLessonMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLessonMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useEnrollCourseQuery,
} = courseApi;
