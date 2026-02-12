// src/features/profile/profileSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileApi } from '../../services/api/profileApi';
import type { ProfileState } from '../../types';

const initialState: ProfileState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchProfileStatsAsync = createAsyncThunk(
  'profile/fetchStats',
  async (userId: string, { rejectWithValue }) => {
    try {
      return await profileApi.fetchStats(userId);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileStatsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileStatsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchProfileStatsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
