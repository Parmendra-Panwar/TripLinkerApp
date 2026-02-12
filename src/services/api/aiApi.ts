// src/services/api/aiApi.ts

import { mockSuccess } from './mockApi';
import type { GeneratedItinerary } from '../../types';

const generateMockItinerary = (
  location: string,
  budget: number
): GeneratedItinerary => {
  const days = budget < 500 ? 3 : budget < 1500 ? 5 : 7;
  const dailyBudget = Math.floor(budget / days);

  return {
    id: `itin_${Date.now()}`,
    location,
    budget,
    currency: 'USD',
    totalDays: days,
    estimatedCost: Math.floor(budget * 0.92),
    summary: `A ${days}-day curated journey through ${location} optimized for value and authentic experiences. Blending iconic landmarks with hidden local gems, this itinerary balances adventure, culture, and relaxation.`,
    days: [
      {
        day: 1,
        title: `Arrival & First Impressions`,
        activities: [
          { time: '2:00 PM', activity: `Arrive in ${location}, hotel check-in`, type: 'accommodation', cost: Math.floor(dailyBudget * 0.4) },
          { time: '4:30 PM', activity: 'Explore the city center on foot', type: 'sightseeing', cost: 0 },
          { time: '7:00 PM', activity: 'Welcome dinner at a local restaurant', type: 'food', cost: Math.floor(dailyBudget * 0.25) },
          { time: '9:00 PM', activity: 'Evening stroll & sunset viewpoint', type: 'leisure', cost: 0 },
        ],
      },
      {
        day: 2,
        title: 'Cultural Deep Dive',
        activities: [
          { time: '8:00 AM', activity: 'Local market breakfast & coffee', type: 'food', cost: Math.floor(dailyBudget * 0.1) },
          { time: '10:00 AM', activity: `${location} Historical Museum tour`, type: 'sightseeing', cost: Math.floor(dailyBudget * 0.12) },
          { time: '1:00 PM', activity: 'Street food lunch in the old quarter', type: 'food', cost: Math.floor(dailyBudget * 0.1) },
          { time: '3:00 PM', activity: 'Local neighborhood walk & photography', type: 'leisure', cost: 0 },
          { time: '7:30 PM', activity: 'Rooftop dinner with panoramic views', type: 'food', cost: Math.floor(dailyBudget * 0.3) },
        ],
      },
      {
        day: 3,
        title: 'Adventure & Nature',
        activities: [
          { time: '7:00 AM', activity: 'Early morning guided hike or tour', type: 'sightseeing', cost: Math.floor(dailyBudget * 0.2) },
          { time: '12:00 PM', activity: 'Picnic lunch with scenic views', type: 'food', cost: Math.floor(dailyBudget * 0.08) },
          { time: '3:00 PM', activity: 'Optional spa or relaxation afternoon', type: 'leisure', cost: Math.floor(dailyBudget * 0.2) },
          { time: '6:00 PM', activity: 'Farewell dinner & local experience', type: 'food', cost: Math.floor(dailyBudget * 0.25) },
        ],
      },
    ].slice(0, days > 3 ? days : 3),
    tips: [
      `Book accommodations in the city center for ${location} to minimize transport costs.`,
      'Download offline maps – saves data and works in areas with poor coverage.',
      `Best local dishes to try: ask your host for the neighborhood restaurant they love.`,
      'Carry local currency for markets and small establishments.',
      'Shoulder season travel can save 20–35% on accommodation in most destinations.',
    ],
    generatedAt: new Date().toISOString(),
  };
};

export const aiApi = {
  generateItinerary: async (
    location: string,
    budget: number
  ): Promise<GeneratedItinerary> => {
    // Simulate AI processing time
    const itinerary = generateMockItinerary(location, budget);
    return mockSuccess(itinerary, 2500); // Longer delay to feel like AI work
  },
};
