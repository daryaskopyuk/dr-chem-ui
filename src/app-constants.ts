// Application's constants go here

export const DEFAULT_APP_API_URL = 'http://localhost:5000';
export const APP_API_URL = process.env.REACT_APP_API_URL;

export const ROUTES = {
  HOME: '/',
  ASTRONAUTS: '/astronauts',
  ASTEROIDS: '/asteroids',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  DATAROBOT_OAUTH_CALLBACK: '/auth/oauth/dr-callback',
};

/* Known error codes returned in 'code' field by server */
export const API_ERROR_CODES = {
  EXAMPLE_ERROR: 'exampleError',
};

export const LOCALSTORAGE_ITEMS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  LOGIN_FROM_LOCATION: 'loginFromLocation',
  CURRENT_USER_DATA: 'currentUserData',
};

export const LOCALES = {
  EN: 'en',
  RU: 'ru',
  UK: 'uk',
};

export const CLIENT_BASE_URL = window.location.port
  ? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
  : `${window.location.protocol}//${window.location.hostname}`;
