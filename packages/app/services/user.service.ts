import { apiClient } from './api-client';
import { User, UserFilter, PaginatedData } from '@mezon-tutors/shared';

export const userService = {
  /**
   * Get user profile by ID
   */
  async getUserById(id: string): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
  },

  /**
   * List users with optional filtering
   */
  async listUsers(filter?: UserFilter): Promise<PaginatedData<User>> {
    const queryParams = new URLSearchParams();
    if (filter) {
      if (filter.cursor) queryParams.append('cursor', filter.cursor);
      if (filter.limit) queryParams.append('limit', filter.limit.toString());
      if (filter.gender) queryParams.append('gender', filter.gender);
      if (filter.ageGroup) queryParams.append('ageGroup', filter.ageGroup);
      if (filter.gameIds && filter.gameIds.length > 0)
        queryParams.append('gameIds', filter.gameIds.join(','));
    }

    const query = queryParams.toString();
    return await apiClient.get<PaginatedData<User>>(`/users${query ? `?${query}` : ''}`);
  },
};
