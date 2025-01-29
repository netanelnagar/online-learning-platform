import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { register, userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:3002/api"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url: inputData.role === "student" ? "/students/signup" : "/teachers/signup",
                method: "POST",
                body: inputData, 
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                    dispatch(register(result?.data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
                url: inputData.role === "student" ? "/students/login" : "/teachers/login",
                method: "POST",
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn(result?.data));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "logout",
                method: "GET"
            }),
            async onQueryStarted(_, { dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.mutation({
            query: (url) => ({
                url: url,
                method: "GET",
            })
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: "profile/update",
                method: "PUT",
                body: formData,
                // credentials: "include"
            }),

        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserMutation,
    useUpdateUserMutation
} = authApi;
