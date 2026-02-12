// src/services/api/exploreApi.ts

import { mockSuccess } from './mockApi';
import type { TravelPost } from '../../types';

const MOCK_POSTS: TravelPost[] = [
  {
    id: 'p_001',
    authorName: 'Sofia Marchetti',
    authorAvatar: 'https://i.pravatar.cc/150?img=23',
    location: 'Santorini',
    country: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    caption: 'Golden hour over the caldera. Nothing prepares you for this view, no matter how many photos you\'ve seen.',
    likes: 1284,
    comments: 47,
    tags: ['Santorini', 'Greece', 'GoldenHour', 'IslandLife'],
    createdAt: '2025-01-10T18:30:00Z',
    isLiked: false,
  },
  {
    id: 'p_002',
    authorName: 'Kenji Watanabe',
    authorAvatar: 'https://i.pravatar.cc/150?img=52',
    location: 'Kyoto',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
    caption: 'Arashiyama bamboo grove at dawn – arrived at 5am to beat the crowds. Worth every second of lost sleep.',
    likes: 2371,
    comments: 89,
    tags: ['Kyoto', 'Japan', 'Bamboo', 'ZenLife'],
    createdAt: '2025-01-08T05:45:00Z',
    isLiked: true,
  },
  {
    id: 'p_003',
    authorName: 'Amara Osei',
    authorAvatar: 'https://i.pravatar.cc/150?img=35',
    location: 'Cape Town',
    country: 'South Africa',
    imageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800',
    caption: 'Table Mountain at sunrise. The cable car doesn\'t open until 8, but hiking up is one of the best decisions I\'ve ever made.',
    likes: 987,
    comments: 34,
    tags: ['CapeTown', 'TableMountain', 'Africa', 'Hiking'],
    createdAt: '2025-01-06T06:00:00Z',
    isLiked: false,
  },
  {
    id: 'p_004',
    authorName: 'Lucia Fernández',
    authorAvatar: 'https://i.pravatar.cc/150?img=44',
    location: 'Cartagena',
    country: 'Colombia',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    caption: 'The colors of the Old City never get old. Every corner is a painting.',
    likes: 756,
    comments: 21,
    tags: ['Colombia', 'Cartagena', 'ColonialCharm', 'Wanderlust'],
    createdAt: '2025-01-04T14:20:00Z',
    isLiked: false,
  },
  {
    id: 'p_005',
    authorName: 'Lars Eriksson',
    authorAvatar: 'https://i.pravatar.cc/150?img=67',
    location: 'Lofoten Islands',
    country: 'Norway',
    imageUrl: 'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800',
    caption: 'Chased the Northern Lights for 3 nights. Night 4 delivered. Patience is a travel superpower.',
    likes: 3102,
    comments: 112,
    tags: ['NorthernLights', 'Norway', 'Lofoten', 'ArcticAdventure'],
    createdAt: '2025-01-02T23:15:00Z',
    isLiked: false,
  },
  {
    id: 'p_006',
    authorName: 'Priya Nair',
    authorAvatar: 'https://i.pravatar.cc/150?img=29',
    location: 'Udaipur',
    country: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800',
    caption: 'The City of Lakes lives up to every superlative. Watching the palace glow at night from a rooftop café – absolute magic.',
    likes: 1445,
    comments: 58,
    tags: ['Udaipur', 'India', 'RajasthanRoyale', 'PalaceLife'],
    createdAt: '2024-12-30T20:00:00Z',
    isLiked: true,
  },
];

export const exploreApi = {
  fetchPosts: async (): Promise<TravelPost[]> => {
    return mockSuccess([...MOCK_POSTS], 900);
  },

  fetchPostById: async (id: string): Promise<TravelPost | undefined> => {
    const post = MOCK_POSTS.find((p) => p.id === id);
    return mockSuccess(post, 400);
  },

  toggleLike: async (postId: string): Promise<{ postId: string; liked: boolean }> => {
    return mockSuccess({ postId, liked: true }, 200);
  },
};
