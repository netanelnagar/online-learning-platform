import { configureStore } from '@reduxjs/toolkit'

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import rootReducer from "./rootReducer";
import { authApi } from '../api/authApi';
import { courseApi } from '../api/courseApi';

export const store = configureStore({
  reducer: rootReducer,
  middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();