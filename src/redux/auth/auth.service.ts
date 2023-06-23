import { rootApi } from '../rootApi';
import { GetAllUsersResponse, GetCurrentUserResponse } from './types';

export const authApi = rootApi.injectEndpoints({
  endpoints: build => ({
    getAllUsers: build.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      transformResponse: (response: GetAllUsersResponse) => response,
    }),

    getCurrentUser: build.query({
      query: userId => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: GetCurrentUserResponse) => response,
    }),
  }),
});

export const { useLazyGetAllUsersQuery, useLazyGetCurrentUserQuery, useGetAllUsersQuery } = authApi;
