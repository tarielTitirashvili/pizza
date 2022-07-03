import { SortType } from '../../../types';

export interface FilteredNum {
  search: string;
  selCategory: number;
  selectedType: number;
  selectedPage: number;
}

export interface FilterState extends FilteredNum {
  selectedSortType: SortType;
}
