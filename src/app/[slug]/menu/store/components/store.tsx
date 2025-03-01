import { configureStore } from '@reduxjs/toolkit';

import cartReducer from "../reducers/cart";


export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Tipagem do RootState e AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;