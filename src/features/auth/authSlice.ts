// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi, LoginPayload, SignupPayload } from '../../services/api/authApi';
import type { AuthState, UserRole } from '../../types';

// ─── Initial State ─────────────────────────────────────────────────────────
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  role: null,
  loading: false,
  error: null,
};

// ─── Async Thunks ──────────────────────────────────────────────────────────
export const loginAsync = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const user = await authApi.login(payload);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signup',
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const user = await authApi.signup(payload);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutAsync = createAsyncThunk('auth/logout', async () => {
  await authApi.logout();
});

// ─── Slice ─────────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<UserRole>) => {
      state.role = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Signup
    builder
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.role = action.payload.role;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.error = null;
    });
  },
});

export const { setRole, clearError } = authSlice.actions;
export default authSlice.reducer;
