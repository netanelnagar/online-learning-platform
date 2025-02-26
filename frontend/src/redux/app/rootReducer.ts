import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { courseApi } from "../api/courseApi";
import authReducer from '../authSlice';
import { teachersApi } from "../api/teachersApi";
import { reviewApi } from "../api/reviewApi";
// console.log(teachersApi)

const rootRedcuer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [teachersApi.reducerPath]: teachersApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    // [purchaseApi.reducerPath]:purchaseApi.reducer,
    // [courseProgressApi.reducerPath]:courseProgressApi.reducer,
    auth: authReducer,
});

export default rootRedcuer;