export type SortType = {
  title: string;
  sortType: string;
  order: 'desc' | 'asc';
};

export type SearchType = {
  search: string;
  setSearch: (c: string) => void;
};

interface basePizza {
  id: number;
  imageUrl: string;
  title: string;
  category: number;
  rating: number;
  price: number;
}

export interface Pizza extends basePizza {
  types: number[];
  sizes: number[];
}

export interface SelectedPizza extends basePizza {
  types: number;
  sizes: number;
}

export interface CartPizza extends SelectedPizza {
  quantity: number;
}
