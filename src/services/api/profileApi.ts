// src/services/api/profileApi.ts

import { mockSuccess } from './mockApi';
import type { ProfileStats } from '../../types';

export const profileApi = {
  fetchStats: async (userId: string): Promise<ProfileStats> => {
    // Mock stats – vary slightly by userId for fun
    const seed = userId.length;
    return mockSuccess(
      {
        tripsPlanned: 12 + (seed % 8),
        placesVisited: 24 + (seed % 15),
        reviewsGiven: 8 + (seed % 5),
        followers: 340 + (seed * 17),
        following: 210 + (seed * 11),
      },
      600
    );
  },
};
