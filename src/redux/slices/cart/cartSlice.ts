import { SelectedPizza } from '../../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartPizza } from '../../../types';
import getCartDetailsFromLS from '../../../utils/getCartDetailsFromLS';
import getCountAndPriceFromLS from '../../../utils/getCountAndPriceFromLS';
import { CartState } from './types';

const { pizzas, totalCount, totalPrice } = getCartDetailsFromLS();

const initialState: CartState = {
  totalPrice: totalPrice,
  totalCount: totalCount,
  pizzas: pizzas,
};

export const cartSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<SelectedPizza | CartPizza>) => {
      let addedPizza = action.payload;
      if (state.pizzas.length > 0) {
        let found = false;
        const founded = state.pizzas.find(
          (pizza) =>
            pizza.id === addedPizza.id &&
            pizza.sizes === addedPizza.sizes &&
            pizza.types === addedPizza.types,
        );
        if (founded) {
          founded.quantity++;
          found = true;
        }
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
      const countPrice = getCountAndPriceFromLS(state.pizzas);
      state.totalCount = countPrice.totalCount;
      state.totalPrice = countPrice.totalPrice;
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

export const { addPizza, removePizza, clearCart, getTotalPriceCount, deletePizza } =
  cartSlice.actions;

export default cartSlice.reducer;
