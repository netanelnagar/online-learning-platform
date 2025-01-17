import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { courseApi } from "../api/courseApi";
import authReducer from '../authSlice';


const rootRedcuer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    // [purchaseApi.reducerPath]:purchaseApi.reducer,
    // [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth: authReducer,
});

export default rootRedcuer;