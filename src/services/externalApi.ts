import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlaceholderUser } from 'interfaces/placeholder';

// Create one api per server
// Define a service using a base URL and expected endpoints
export const externalApi = createApi({
  reducerPath: 'externalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<PlaceholderUser, void>({
      query: () => '/users',
    }),
    getUsersById: builder.query<PlaceholderUser, number>({
      query: (id) => `/users?id=${id}`,
    }),
    getUsersByUsername: builder.query<PlaceholderUser, string>({
      query: (username) => `/users?username=${username}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useGetUsersByUsernameQuery,
} = externalApi;
