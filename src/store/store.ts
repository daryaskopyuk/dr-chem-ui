import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { externalApi } from 'services/externalApi';
import { appApi } from 'services/appApi';

const store = configureStore({
  reducer: {
    // Add the generated rtk-query reducer(s) as a specific top-level slice
    [externalApi.reducerPath]: externalApi.reducer,
    [appApi.reducerPath]: appApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(externalApi.middleware)
      .concat(appApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
