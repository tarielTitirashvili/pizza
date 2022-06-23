import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartPizza, SelectedPizza } from '../../types';

export interface FilterState {
  totalPrice: number;
  totalCount: number;
  pizzas: CartPizza[];
}

const initialState: FilterState = {
  totalPrice: 0,
  totalCount: 0,
  pizzas: [],
};

export const cartSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<SelectedPizza | CartPizza>) => {
      let addedPizza = action.payload;
      if (state.pizzas.length > 0) {
        let found = false;
        state.pizzas.forEach((pizza) => {
          if (pizza.id === addedPizza.id) {
            if (pizza.sizes === addedPizza.sizes) {
              if (pizza.types === addedPizza.types) {
                pizza.quantity = pizza.quantity + 1;
                state.totalPrice = state.totalPrice + pizza.price;
                state.totalCount = state.totalCount + 1;
                found = true;
              }
            }
          }
        });
        if (!found) {
          state.totalPrice = state.totalPrice + addedPizza.price;
          state.totalCount = state.totalCount + 1;
          state.pizzas.push({ ...addedPizza, quantity: 1 });
        }
      } else {
        state.totalPrice = addedPizza.price;
        state.totalCount = state.totalCount + 1;
        let newPizza: CartPizza = { ...addedPizza, quantity: 1 };
        state.pizzas.push(newPizza);
      }
    },
    removePizza: (state, action: PayloadAction<SelectedPizza | CartPizza>) => {
      let addedPizza = action.payload;
      state.pizzas.forEach((pizza, i) => {
        if (pizza.id === addedPizza.id) {
          if (pizza.sizes === addedPizza.sizes) {
            if (pizza.types === addedPizza.types) {
              if (pizza.quantity <= 1) {
                state.totalPrice = state.totalPrice - pizza.price;
                state.totalCount = state.totalCount - 1;
                return state.pizzas.splice(i, 1);
              } else {
                pizza.quantity = pizza.quantity - 1;
                state.totalPrice = state.totalPrice - pizza.price;
                state.totalCount = state.totalCount - 1;
              }
            }
          }
        }
      });
    },
    getTotalPriceCount: (state) => {
      state.pizzas.forEach((pizza) => {
        state.totalCount = state.totalCount + pizza.quantity;
        state.totalPrice = state.totalPrice + pizza.price * pizza.quantity;
      });
    },
    clearCart: (state) => {
      state.pizzas = [];
    },
  },
});

export const { addPizza, removePizza, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
