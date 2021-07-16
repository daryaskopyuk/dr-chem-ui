import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlaceholderUser } from 'interfaces/external';

// Please create one Api file per service

const SERVICE_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Define a service using a base URL and expected endpoints
export const astronautsApi = createApi({
  reducerPath: 'astronautsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVICE_BASE_URL,
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
    addUser: builder.mutation<PlaceholderUser, Partial<PlaceholderUser>>({
      query(body) {
        return {
          url: `/users`,
          method: 'POST',
          body,
        };
      },
    }),
    updateUser: builder.mutation<PlaceholderUser, Partial<PlaceholderUser>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/users/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useGetUsersByUsernameQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = astronautsApi;
