import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { LOCALSTORAGE_ITEMS, APP_API_URL } from 'app-constants';
import { getLocalstorage, setLocalstorage } from 'utils/localStorage';

import {
  AuthorizeUrlResponse,
  ApplicationApiErrorResponse,
} from 'interfaces/application';

const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCALSTORAGE_ITEMS;

const baseQuery = fetchBaseQuery({
  baseUrl: APP_API_URL,
  prepareHeaders: (headers) => {
    const accessToken = getLocalstorage(ACCESS_TOKEN);
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
    const refreshToken = getLocalstorage(REFRESH_TOKEN);
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
      setLocalstorage(ACCESS_TOKEN, access);
      // api.dispatch(tokenReceived(refreshResult.data));
      // retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // console.log('Logged out');
      // api.dispatch(loggedOut());
    }
  }

  if ((result.data as ApplicationApiErrorResponse).error) {
    const { code, message } = (result.data as ApplicationApiErrorResponse)
      .error;

    if (code || message) {
      return {
        error: { status: 200, data: result.data, code, message },
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
      query: () => '/oauth/authorize-url',
    }),
    authenticate: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/oauth/authenticate',
        method: 'POST',
        body: payload,
      }),
    }),
    detect: builder.query<any, void>({
      query: () => '/detect',
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDetectQuery,
  useGetAuthorizeUrlQuery,
  useAuthenticateMutation,
} = applicationApi;
