// src/services/api/placesApi.ts

import { mockSuccess } from './mockApi';
import type { Property } from '../../types';

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop_001',
    name: 'Villa Serenita',
    type: 'villa',
    location: 'Positano',
    country: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800',
    images: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    ],
    pricePerNight: 420,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 234,
    description:
      'A breathtaking cliffside villa with sweeping Amalfi Coast views. Featuring hand-painted tiles, a private infinity pool, and staff dedicated to making your stay exceptional.',
    amenities: [
      { icon: 'wifi', label: 'Fast WiFi' },
      { icon: 'pool', label: 'Infinity Pool' },
      { icon: 'car', label: 'Free Parking' },
      { icon: 'cutlery', label: 'Private Chef' },
    ],
    hostName: 'Marco Ricci',
    hostAvatar: 'https://i.pravatar.cc/150?img=15',
    isFavorited: false,
  },
  {
    id: 'prop_002',
    name: 'Sakura Ryokan',
    type: 'hotel',
    location: 'Hakone',
    country: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800',
    images: [
      'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800',
    ],
    pricePerNight: 280,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 412,
    description:
      'An authentic Japanese ryokan experience with Mt. Fuji views, traditional onsen baths, and exquisite kaiseki cuisine. A spiritual retreat in the heart of nature.',
    amenities: [
      { icon: 'droplet', label: 'Hot Spring Bath' },
      { icon: 'utensils', label: 'Kaiseki Dinner' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'moon', label: 'Yukata Provided' },
    ],
    hostName: 'Yuki Tanaka',
    hostAvatar: 'https://i.pravatar.cc/150?img=48',
    isFavorited: true,
  },
  {
    id: 'prop_003',
    name: 'The Dune Retreat',
    type: 'resort',
    location: 'Marrakech',
    country: 'Morocco',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
    ],
    pricePerNight: 190,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 318,
    description:
      'A palatial riad nestled within the medina, blending Moorish architecture with modern luxury. Rooftop terraces, a mosaic-tiled pool, and spice-laden breakfasts await.',
    amenities: [
      { icon: 'pool', label: 'Mosaic Pool' },
      { icon: 'coffee', label: 'Rooftop Café' },
      { icon: 'spa', label: 'Hammam Spa' },
      { icon: 'wifi', label: 'WiFi' },
    ],
    hostName: 'Fatima Benali',
    hostAvatar: 'https://i.pravatar.cc/150?img=31',
    isFavorited: false,
  },
  {
    id: 'prop_004',
    name: 'Arctic Glass Cabin',
    type: 'villa',
    location: 'Saariselkä',
    country: 'Finland',
    imageUrl: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
    images: [
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800',
    ],
    pricePerNight: 650,
    currency: 'USD',
    rating: 5.0,
    reviewCount: 87,
    description:
      'Fall asleep under the Northern Lights in a climate-controlled glass cabin deep in Finnish Lapland. Wake to reindeer wandering past your window.',
    amenities: [
      { icon: 'star', label: 'Aurora Views' },
      { icon: 'snowflake', label: 'Heated Floor' },
      { icon: 'wifi', label: 'WiFi' },
      { icon: 'fire', label: 'Sauna' },
    ],
    hostName: 'Mikael Lahti',
    hostAvatar: 'https://i.pravatar.cc/150?img=61',
    isFavorited: false,
  },
];

export const placesApi = {
  fetchProperties: async (): Promise<Property[]> => {
    return mockSuccess([...MOCK_PROPERTIES], 800);
  },

  fetchPropertyById: async (id: string): Promise<Property | undefined> => {
    const property = MOCK_PROPERTIES.find((p) => p.id === id);
    return mockSuccess(property, 400);
  },

  addProperty: async (data: Partial<Property>): Promise<Property> => {
    const newProperty: Property = {
      id: `prop_${Date.now()}`,
      name: data.name ?? 'New Property',
      type: data.type ?? 'hotel',
      location: data.location ?? '',
      country: data.country ?? '',
      imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      images: [],
      pricePerNight: data.pricePerNight ?? 100,
      currency: 'USD',
      rating: 0,
      reviewCount: 0,
      description: data.description ?? '',
      amenities: [],
      hostName: 'You',
      hostAvatar: 'https://i.pravatar.cc/150?img=5',
      isFavorited: false,
    };
    return mockSuccess(newProperty, 1200);
  },
};
