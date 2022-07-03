import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { sortTypes } from '../../../constants';
import { RootState } from '../../store/store';
import { FilteredNum, FilterState } from './types';

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



export const { setSelCategory, setSelectedType, setSelectedPage, setFilters, setSearch } =
  filterSlice.actions;

export default filterSlice.reducer;
