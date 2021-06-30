import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { getLocalstorage, setLocalstorage } from 'utils/localStore';
import User from 'interfaces/user';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_SE_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = getLocalstorage('accessToken');
    // If we have a token set in local storage, pass it to server.
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

interface TokenRefreshData {
  access: string;
  refresh?: string;
}

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshToken = getLocalstorage('refreshToken');
    const refreshResult = await baseQuery(
      {
        url: '/token/refresh',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );
    const refreshData = refreshResult.data as TokenRefreshData;
    if (refreshData) {
      const { access } = refreshData;
      // store the new token
      setLocalstorage('accessToken', access);
      // api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // console.log('Logged out');
      // api.dispatch(loggedOut());
    }
  }
  return result;
};

export interface UserResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  // eslint-disable-next-line camelcase
  agreed_terms_and_privacy: boolean;
}

export interface VerifyRequest {
  email: string;
  token: string;
}

export interface ForgotRequest {
  email: string;
}

export interface ResetRequest {
  email: string;
  password: string;
  token: string;
}

const post = (url: string) => (body: any) => ({
  url,
  method: 'POST',
  body,
});

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: post('/sign-in'),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: post('/sign-up'),
    }),
    verifyEmail: builder.mutation<UserResponse, VerifyRequest>({
      query: post('/verify-email'),
    }),
    forgotPassword: builder.mutation<UserResponse, ForgotRequest>({
      query: post('/reset-password/'),
    }),
    resetPassword: builder.mutation<UserResponse, ResetRequest>({
      query: post('/reset-password/confirm/'),
    }),
    currentUser: builder.query<User, void>({
      query: () => '/user-info',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useCurrentUserQuery,
} = appApi;
