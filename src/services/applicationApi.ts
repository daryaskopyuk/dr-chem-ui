import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { LOCALSTORAGE_ITEMS, APP_API_URL } from 'app-constants';
import { getLocalstorage, setLocalstorage } from 'utils/localStorage';
import { setCurrentUser } from 'store/currentUser';

import {
  AuthorizeUrlResponse,
  ApplicationApiErrorResponse,
} from 'interfaces/application';

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALSTORAGE_ITEMS;

const SERVICE_BASE_URL = APP_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: SERVICE_BASE_URL,
});

const baseAuthQuery = fetchBaseQuery({
  baseUrl: SERVICE_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getLocalstorage(ACCESS_TOKEN);
    // If we have a token set in local storage, pass it to server.
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

interface TokenRefreshData {
  accessToken: string;
}

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseAuthQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const accessToken = getLocalstorage(ACCESS_TOKEN);
    const refreshToken = getLocalstorage(REFRESH_TOKEN);
    const refreshResult = await baseQuery(
      {
        url: '/refresh-token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
        body: { access_token: accessToken },
      },
      api,
      extraOptions
    );
    const refreshData = refreshResult.data as TokenRefreshData;
    if (refreshData) {
      const { accessToken: access } = refreshData;
      // store the new token
      setLocalstorage(ACCESS_TOKEN, access);
      // api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseAuthQuery(args, api, extraOptions);
    } else {
      setLocalstorage(ACCESS_TOKEN, '');
      setLocalstorage(REFRESH_TOKEN, '');
      api.dispatch(setCurrentUser({}));
    }
  }

  if ((result.data as ApplicationApiErrorResponse)?.error) {
    const { code, message } = (result.data as ApplicationApiErrorResponse)
      .error;

    if (code || message) {
      return {
        error: { status: 200, data: result.data },
        data: undefined,
      };
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: (builder) => ({
    getAuthorizeUrl: builder.query<AuthorizeUrlResponse, void>({
      query: () => '/oauth/authorization-url',
    }),
    getUserInfo: builder.query<any, void>({
      query: () => '/user-info',
    }),
    getAsteroids: builder.query<any, void>({
      query: (payload) => ({
        url: '/projects/',
        method: 'POST',
        body: payload,
      }),
    }),
    authenticate: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/oauth/access-token',
        method: 'POST',
        body: payload,
      }),
    }),
    deNovoData: builder.mutation<any, any>({
      query: (queryString) => ({
        url: `/denovo/?${queryString}`,
        method: 'GET',
      }),
    }),
    smilesPrediction:  builder.mutation<any, any>({
      query: (queryString) => ({
        url: `/predictions/?smiles=${queryString}`,
        method: 'GET',

      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetUserInfoQuery,
  useGetAsteroidsQuery,
  useGetAuthorizeUrlQuery,
  useAuthenticateMutation,
  useDeNovoDataMutation,
  useSmilesPredictionMutation,
} = applicationApi;
