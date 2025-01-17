import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './app/store'
import { IAdmin, IStudent, ITeacher } from '../types/types'

interface IAuthState {
    user?: IAdmin | IStudent | ITeacher;
    isAuthenticated: boolean;
}

const initialState: IAuthState = {
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IAdmin | IStudent | ITeacher>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            delete state.user;
            state.isAuthenticated = false;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        register: (state, action: PayloadAction<IAdmin | IStudent | ITeacher>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
    },
})

export const { login, logout, register } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state;

export default authSlice.reducer