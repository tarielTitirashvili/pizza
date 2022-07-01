import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTypes } from '../../constants';
import { SortType } from '../../types';
import { RootState } from '../store/store';

interface FilteredNum {
  search: string;
  selCategory: number;
  selectedType: number;
  selectedPage: number;
}

export interface FilterState extends FilteredNum {
  selectedSortType: SortType;
}

const initialState: FilterState = {
  search: '',
  selCategory: 0,
  selectedType: 0,
  selectedSortType: sortTypes[0],
  selectedPage: 1,
};

export const filterSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
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
      state.search = action.payload.search;
      state.selCategory = action.payload.selCategory;
      state.selectedPage = action.payload.selectedPage;
      state.selectedType = action.payload.selectedType;
      state.selectedSortType = sortTypes[action.payload.selectedType];
    },
  },
});

export const selectSelectedType = (state: RootState): number => state.filter.selectedType;
export const selectSearch = (state: RootState): string => state.filter.search;

export const { setSelCategory, setSelectedType, setSelectedPage, setFilters, setSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
