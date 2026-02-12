// src/features/explore/exploreSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { exploreApi } from '../../services/api/exploreApi';
import type { ExploreState, TravelPost } from '../../types';

const initialState: ExploreState = {
  posts: [],
  loading: false,
  error: null,
  likedPosts: [],
};

// ─── Async Thunks ──────────────────────────────────────────────────────────
export const fetchPostsAsync = createAsyncThunk(
  'explore/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await exploreApi.fetchPosts();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ─── Slice ─────────────────────────────────────────────────────────────────
const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (!post) return;

      const isLiked = state.likedPosts.includes(postId);
      if (isLiked) {
        state.likedPosts = state.likedPosts.filter((id) => id !== postId);
        post.likes -= 1;
        post.isLiked = false;
      } else {
        state.likedPosts.push(postId);
        post.likes += 1;
        post.isLiked = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Sync liked state
        state.posts = action.payload.map((post) => ({
          ...post,
          isLiked: state.likedPosts.includes(post.id),
          likes: state.likedPosts.includes(post.id) ? post.likes + 1 : post.likes,
        }));
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleLike } = exploreSlice.actions;
export default exploreSlice.reducer;
