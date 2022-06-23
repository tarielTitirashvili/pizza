import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTypes } from '../../constants';
import { SortType } from '../../types';

interface FilteredNum {
  selCategory: number;
  selectedType: number;
  selectedPage: number;
}

export interface FilterState extends FilteredNum {
  selectedSortType: SortType;
}

const initialState: FilterState = {
  selCategory: 0,
  selectedType: 0,
  selectedSortType: sortTypes[0],
  selectedPage: 1,
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
    setSelectedPage: (state, action: PayloadAction<number>) => {
      state.selectedPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilteredNum>) => {
      state.selCategory = action.payload.selCategory;
      state.selectedPage = action.payload.selectedPage;
      state.selectedType = action.payload.selectedType;
      state.selectedSortType = sortTypes[action.payload.selectedType];
    },
  },
});

export const { setSelCategory, setSelectedType, setSelectedPage, setFilters } =
  categorySlice.actions;

export default categorySlice.reducer;
