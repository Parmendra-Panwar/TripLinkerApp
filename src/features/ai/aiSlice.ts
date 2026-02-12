// src/features/ai/aiSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { aiApi } from '../../services/api/aiApi';
import type { AIState } from '../../types';

const initialState: AIState = {
  itinerary: null,
  loading: false,
  error: null,
  lastInput: null,
};

export const generateItineraryAsync = createAsyncThunk(
  'ai/generateItinerary',
  async (
    { location, budget }: { location: string; budget: string },
    { rejectWithValue }
  ) => {
    try {
      const budgetNum = parseFloat(budget);
      if (isNaN(budgetNum) || budgetNum <= 0) {
        throw new Error('Please enter a valid budget amount');
      }
      if (!location.trim()) {
        throw new Error('Please enter a destination');
      }
      return await aiApi.generateItinerary(location, budgetNum);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearItinerary: (state) => {
      state.itinerary = null;
      state.error = null;
      state.lastInput = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateItineraryAsync.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.itinerary = null;
        state.lastInput = action.meta.arg;
      })
      .addCase(generateItineraryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.itinerary = action.payload;
      })
      .addCase(generateItineraryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearItinerary } = aiSlice.actions;
export default aiSlice.reducer;
