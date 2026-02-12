// src/features/places/placesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { placesApi } from '../../services/api/placesApi';
import type { PlacesState, Property } from '../../types';

const initialState: PlacesState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

export const fetchPropertiesAsync = createAsyncThunk(
  'places/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      return await placesApi.fetchProperties();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPropertyByIdAsync = createAsyncThunk(
  'places/fetchPropertyById',
  async (id: string, { rejectWithValue }) => {
    try {
      const property = await placesApi.fetchPropertyById(id);
      if (!property) throw new Error('Property not found');
      return property;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addPropertyAsync = createAsyncThunk(
  'places/addProperty',
  async (data: Partial<Property>, { rejectWithValue }) => {
    try {
      return await placesApi.addProperty(data);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const prop = state.properties.find((p) => p.id === action.payload);
      if (prop) prop.isFavorited = !prop.isFavorited;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertiesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchPropertiesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPropertyByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addPropertyAsync.fulfilled, (state, action) => {
        state.properties.unshift(action.payload);
      });
  },
});

export const { clearSelectedProperty, toggleFavorite } = placesSlice.actions;
export default placesSlice.reducer;
