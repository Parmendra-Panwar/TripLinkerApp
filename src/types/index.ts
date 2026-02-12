// src/types/index.ts

export type UserRole = 'user' | 'business';

// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  joinedDate: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
}

// ─── Explore ─────────────────────────────────────────────────────────────────
export interface TravelPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  location: string;
  country: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  tags: string[];
  createdAt: string;
  isLiked: boolean;
}

export interface ExploreState {
  posts: TravelPost[];
  loading: boolean;
  error: string | null;
  likedPosts: string[];
}

// ─── Places ──────────────────────────────────────────────────────────────────
export interface PropertyAmenity {
  icon: string;
  label: string;
}

export interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'villa' | 'hostel' | 'resort' | 'apartment';
  location: string;
  country: string;
  imageUrl: string;
  images: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  amenities: PropertyAmenity[];
  hostName: string;
  hostAvatar: string;
  isFavorited: boolean;
}

export interface PlacesState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

// ─── AI Itinerary ─────────────────────────────────────────────────────────────
export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    type: 'transport' | 'food' | 'sightseeing' | 'accommodation' | 'leisure';
    cost: number;
  }[];
}

export interface GeneratedItinerary {
  id: string;
  location: string;
  budget: number;
  currency: string;
  totalDays: number;
  estimatedCost: number;
  summary: string;
  days: ItineraryDay[];
  tips: string[];
  generatedAt: string;
}

export interface AIState {
  itinerary: GeneratedItinerary | null;
  loading: boolean;
  error: string | null;
  lastInput: { budget: string; location: string } | null;
}

// ─── Profile ─────────────────────────────────────────────────────────────────
export interface ProfileStats {
  tripsPlanned: number;
  placesVisited: number;
  reviewsGiven: number;
  followers: number;
  following: number;
}

export interface ProfileState {
  stats: ProfileStats | null;
  loading: boolean;
  error: string | null;
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type MainTabParamList = {
  Explore: undefined;
  Places: undefined;
  AI: undefined;
  Profile: undefined;
};

export type PlacesStackParamList = {
  PlacesList: undefined;
  PlaceDetail: { propertyId: string };
  AddProperty: undefined;
};
