import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { astronautsApi } from 'services/astronautsApi';
import { applicationApi } from 'services/applicationApi';

import currentUser from './currentUser';
import currentModel from './currentModel';
import locale from './locale';

const store = configureStore({
  reducer: {
    // Add the generated rtk-query reducer(s) as a specific top-level slice
    [astronautsApi.reducerPath]: astronautsApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    currentUser,
    currentModel,
    locale,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(astronautsApi.middleware)
      .concat(applicationApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
