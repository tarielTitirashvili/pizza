import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartPizza, Pizza, SortType } from '../../types';
import { RootState } from '../store/store';

export interface PizzasState {
  pizzas: Pizza[];
  status: 'loading' | 'success' | 'error';
}

const initialState: PizzasState = {
  pizzas: [],
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<Pizza[]>) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = 'error';
      state.pizzas = [];
    });
  },
});

interface Params {
  search: string;
  selCategory: number;
  selectedType: SortType;
  selectedPage: number;
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzas',
  async (params: Params, thunkAPI) => {
    const { search, selCategory, selectedPage, selectedType } = params;
    const { data } = await axios.get(
      `https://62a85ee7943591102ba05a2c.mockapi.io/pizzas?${`${
        selCategory ? `category=${selCategory}&` : ''
      }`}page=${selectedPage}&limit=4&sortBy=${selectedType?.sortType}&order=${
        selectedType?.order
      }${search && `&title=${search}`}`,
    );
    return data;
  },
);

export const selectPizzas = (state: RootState):PizzasState  => state.pizzas
export const selectPizzaById = (id: number, selectedSize: number, selectedType: number) =>
(state: RootState):CartPizza | undefined => state.cart.pizzas.find(
  (obj) =>
    obj.id === id &&
    obj.sizes === selectedSize &&
    obj.types === selectedType,
)
 
// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
