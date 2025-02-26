import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './app/store'
import { IAdmin, IStudent, ITeacher } from '../types/types'

interface IAuthState {
    user?: IAdmin | IStudent | ITeacher;
    isAuthenticated: boolean;
    token?: string;
}

const initialState: IAuthState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<{ token?: string; data: IAdmin | IStudent | ITeacher }>) => {
            state.user = action.payload.data;
            state.token = action.payload?.token;
            state.isAuthenticated = true;
        },
        userLoggedOut: (state) => {
            delete state.user;
            state.isAuthenticated = false;
            state.token = undefined;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        register: (state, action: PayloadAction<{ token: string; data: IAdmin | IStudent | ITeacher }>) => {
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        updateEnrollCourses: (state, action: PayloadAction<{ data: IStudent }>) => {
            state.user = action.payload.data;
            state.isAuthenticated = true;
        },
        updateCertificate: (state, action: PayloadAction<{ course: string; completionDate: string }>) => {
            (state.user as IStudent)?.certificates.push(action.payload);
            state.isAuthenticated = true;
        },
    },
})

export const { userLoggedIn, userLoggedOut, register, updateEnrollCourses, updateCertificate } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;