import { RootState } from "../../store/store";

export const selectSelectedType = (state: RootState): number => state.filter.selectedType;
export const selectSearch = (state: RootState): string => state.filter.search;