export type SortType = {
  title: string;
  sortType: string;
  order: 'desc' | 'asc';
};

export type Category =
  | 'All'
  | 'Meat'
  | 'Vegetarian'
  | 'Grill'
  | 'Spicy'
  | 'Closed';

export type SearchType = {
  search: string;
  setSearch: (c: string) => void;
};
