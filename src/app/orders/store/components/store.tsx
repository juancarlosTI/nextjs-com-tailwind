import { configureStore } from '@reduxjs/toolkit';

import {orderProductReducer, orderReducer} from "../reducers/orderProducts";


export const store = configureStore({
  reducer: {
    order: orderReducer,
    orderProduct: orderProductReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Tipagem do RootState e AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;