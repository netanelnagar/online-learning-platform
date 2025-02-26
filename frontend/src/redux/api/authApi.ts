import { IStudent, ITeacher } from './../../types/types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { register, userLoggedIn, userLoggedOut } from "../authSlice";
import { IAdmin } from "../../types/types";

const USER_API = `${import.meta.env.VITE_API_URL}/api`

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include',
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
        logoutUser: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
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
        loadUser: builder.mutation<IAdmin | IStudent | ITeacher, void>({
            query: () => ({
                url: "/auto-login",
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ data: (result?.data as IAdmin | IStudent | ITeacher) }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation<any, { role: string; data: any }>({
            query: ({ role, data }) => ({
                url: `${role}/updateMe`,
                method: "PATCH",
                body: data,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn(result?.data));
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        updatePhotoUser: builder.mutation<{ status: string, data: any }, { role: string; photo: File }>({
            query: ({ role, photo }) => {
                const formData = new FormData();
                formData.append("photo", photo);
                return {
                    url: `${role}/updateMe`,
                    method: "PATCH",
                    body: formData,

                }
            },
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn(result?.data));
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserMutation,
    useUpdateUserMutation,
    useUpdatePhotoUserMutation
} = authApi;
