// src/services/api/mockApi.ts
// Simulates network latency for all mock API calls

export const mockDelay = (ms: number = 800): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const mockSuccess = async <T>(data: T, delay?: number): Promise<T> => {
  await mockDelay(delay);
  return data;
};

export const mockFailure = async (
  message: string,
  delay?: number
): Promise<never> => {
  await mockDelay(delay);
  throw new Error(message);
};

// Generic paginated response wrapper
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  hasMore: boolean;
}
