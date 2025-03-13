import { configureStore } from '@reduxjs/toolkit';

import ordersReducer from "../reducers/orders";


export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
});

// Tipagem do RootState e AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;