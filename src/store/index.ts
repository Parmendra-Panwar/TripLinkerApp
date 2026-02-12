// src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from '../features/auth/authSlice';
import exploreReducer from '../features/explore/exploreSlice';
import placesReducer from '../features/places/placesSlice';
import aiReducer from '../features/ai/aiSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    explore: exploreReducer,
    places: placesReducer,
    ai: aiReducer,
    profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths for non-serializable values if needed
        ignoredActions: [],
      },
    }),
});

// ─── Typed Hooks ──────────────────────────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use these throughout the app instead of plain useDispatch/useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
