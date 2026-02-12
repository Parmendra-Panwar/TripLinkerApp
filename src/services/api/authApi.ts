// src/services/api/authApi.ts

import { mockSuccess, mockFailure } from './mockApi';
import type { User, UserRole } from '../../types';

const MOCK_USERS: User[] = [
  {
    id: 'u_001',
    name: 'Alex Rivera',
    email: 'alex@triplinker.com',
    avatar: 'https://i.pravatar.cc/150?img=11',
    role: 'user',
    joinedDate: '2024-03-15',
  },
  {
    id: 'u_002',
    name: 'Blue Horizon Hotels',
    email: 'contact@bluehorizon.com',
    avatar: 'https://i.pravatar.cc/150?img=55',
    role: 'business',
    joinedDate: '2024-01-10',
  },
];

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export const authApi = {
  login: async (payload: LoginPayload): Promise<User> => {
    // Simulate auth check – always succeeds in mock
    if (!payload.email || !payload.password) {
      return mockFailure('Email and password are required', 500);
    }

    const mockUser: User = {
      id: `u_${Date.now()}`,
      name: payload.role === 'business' ? 'My Business' : 'Traveler',
      email: payload.email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      role: payload.role,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    return mockSuccess(mockUser, 1000);
  },

  signup: async (payload: SignupPayload): Promise<User> => {
    if (!payload.name || !payload.email || !payload.password) {
      return mockFailure('All fields are required', 500);
    }

    const newUser: User = {
      id: `u_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      role: payload.role,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    return mockSuccess(newUser, 1200);
  },

  logout: async (): Promise<void> => {
    return mockSuccess(undefined, 300);
  },
};
