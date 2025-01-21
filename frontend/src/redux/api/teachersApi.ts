import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITeacher } from "../../types/types";


export const teachersApi = createApi({
    reducerPath: "teachersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3002/api/teachers",
    }),
    endpoints: (builder) => ({
        teachers: builder.mutation<{status:string; data:ITeacher[]}, void>({
            query: () => ({
                url: "",
                method: "GET",
            })
        }),
        teacherById: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            })
        })
    })
})


export const { useTeachersMutation, useTeacherByIdMutation } = teachersApi;