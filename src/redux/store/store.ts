import filterReducer from '../slices/filter/filterSlice';
import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../slices/cart/cartSlice';
import pizzasSlice from '../slices/pizzas/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
