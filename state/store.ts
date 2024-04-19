import { configureStore } from '@reduxjs/toolkit';

import quoteReducer from './quote/quote.slice';

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
