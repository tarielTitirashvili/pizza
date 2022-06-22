import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTypes } from '../../constants';
import { SortType } from '../../types';

export interface CategoryState {
  selCategory: number;
  selectedType: number;
  selectedSortType: SortType;
}

const initialState: CategoryState = {
  selCategory: 0,
  selectedType: 0,
  selectedSortType: sortTypes[0],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelCategory: (state, action: PayloadAction<number>) => {
      state.selCategory = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<number>) => {
      state.selectedType = action.payload;
      state.selectedSortType = sortTypes[action.payload];
    },
  },
});

export const { setSelCategory, setSelectedType } = categorySlice.actions;

export default categorySlice.reducer;
