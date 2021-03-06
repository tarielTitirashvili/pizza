import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SortType } from '../../../types';
import { PizzasState, Status } from './types';

const initialState: PizzasState = {
  pizzas: [],
  status: Status.LOADING,
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
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
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

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params: Params) => {
  const { search, selCategory, selectedPage, selectedType } = params;
  const { data } = await axios.get<Pizza[]>(
    `https://62a85ee7943591102ba05a2c.mockapi.io/pizzas?${`${
      selCategory ? `category=${selCategory}&` : ''
    }`}page=${selectedPage}&limit=8&sortBy=${selectedType?.sortType}&order=${selectedType?.order}${
      search && `&title=${search}`
    }`,
  );
  return data;
});

// Action creators are generated for each case reducer function
export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
