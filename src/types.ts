export type SortType = {
  title: string;
  sortType: string;
  order: 'desc' | 'asc';
};

export type SearchType = {
  search: string;
  setSearch: (c: string) => void;
};
