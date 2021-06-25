import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query/react';
import { placeholderApi } from 'services/placeholderApi';
import { supplyExchangeApi } from 'services/supplyExchangeApi';

const store = configureStore({
  reducer: {
    // Add the generated rtk-query reducer(s) as a specific top-level slice
    [placeholderApi.reducerPath]: placeholderApi.reducer,
    [supplyExchangeApi.reducerPath]: supplyExchangeApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(placeholderApi.middleware)
      .concat(supplyExchangeApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;
