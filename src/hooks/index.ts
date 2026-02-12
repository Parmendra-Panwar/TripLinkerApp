// src/hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from '../store';
import { logoutAsync } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, role, isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth
  );

  const logout = () => dispatch(logoutAsync());
  const isBusinessUser = role === 'business';

  return { user, role, isAuthenticated, loading, error, logout, isBusinessUser };
};

// ─────────────────────────────────────────────────────────────────────────────

// src/hooks/useExplore.ts
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchPostsAsync, toggleLike } from '../features/explore/exploreSlice';

export const useExplore = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector((state) => state.explore);

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPostsAsync());
    }
  }, []);

  const handleToggleLike = (postId: string) => dispatch(toggleLike(postId));
  const refresh = () => dispatch(fetchPostsAsync());

  return { posts, loading, error, toggleLike: handleToggleLike, refresh };
};

// ─────────────────────────────────────────────────────────────────────────────

// src/hooks/usePlaces.ts
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store';
import {
  fetchPropertiesAsync,
  toggleFavorite,
} from '../features/places/placesSlice';

export const usePlaces = () => {
  const dispatch = useAppDispatch();
  const { properties, loading, error } = useAppSelector((state) => state.places);

  useEffect(() => {
    if (properties.length === 0) {
      dispatch(fetchPropertiesAsync());
    }
  }, []);

  const handleToggleFavorite = (id: string) => dispatch(toggleFavorite(id));

  return { properties, loading, error, toggleFavorite: handleToggleFavorite };
};
