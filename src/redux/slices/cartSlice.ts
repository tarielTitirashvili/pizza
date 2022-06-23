import { SelectedPizza } from './../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartPizza } from '../../types';

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
          if (
            pizza.id === addedPizza.id &&
            pizza.sizes === addedPizza.sizes &&
            pizza.types === addedPizza.types
          ) {
            pizza.quantity = pizza.quantity + 1;
            found = true;
          }
        });
        if (!found) {
          state.pizzas.push({ ...addedPizza, quantity: 1 });
        }
      } else {
        let newPizza: CartPizza = { ...addedPizza, quantity: 1 };
        state.pizzas.push(newPizza);
      }
    },
    removePizza: (state, action: PayloadAction<SelectedPizza | CartPizza>) => {
      let addedPizza = action.payload;
      state.pizzas.forEach((pizza, i) => {
        if (
          pizza.id === addedPizza.id &&
          pizza.sizes === addedPizza.sizes &&
          pizza.types === addedPizza.types
        ) {
          if (pizza.quantity <= 1) {
            return state.pizzas.splice(i, 1);
          } else {
            pizza.quantity = pizza.quantity - 1;
          }
        }
      });
    },
    getTotalPriceCount: (state) => {
      let count = 0;
      let price = 0;
      state.pizzas.forEach((pizza) => {
        count = count + pizza.quantity;
        price = price + pizza.price * pizza.quantity;
      });
      state.totalCount = count;
      state.totalPrice = price;
    },
    clearCart: (state) => {
      state.pizzas = [];
    },
    deletePizza: (state, action: PayloadAction<CartPizza>) => {
      let addedPizza = action.payload;
      state.pizzas.forEach((pizza, i) => {
        if (
          pizza.id === addedPizza.id &&
          pizza.sizes === addedPizza.sizes &&
          pizza.types === addedPizza.types
        ) {
          return state.pizzas.splice(i, 1);
        }
      });
    },
  },
});

export const {
  addPizza,
  removePizza,
  clearCart,
  getTotalPriceCount,
  deletePizza,
} = cartSlice.actions;

export default cartSlice.reducer;
