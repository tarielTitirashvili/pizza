import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CategoryState {
  category: number;
}

const initialState: CategoryState = {
  category: 0,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
