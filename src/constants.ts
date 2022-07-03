import { SortType } from './types';

export const categories: string[] = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Chicken'];

export const sortTypes: SortType[] = [
  {
    title: 'popularity (DESC)',
    sortType: 'rating',
    order: 'desc',
  },
  {
    title: 'popularity (ASC)',
    sortType: 'rating',
    order: 'asc',
  },
  {
    title: 'price (DESC)',
    sortType: 'price',
    order: 'desc',
  },
  {
    title: 'price (ASC)',
    sortType: 'price',
    order: 'asc',
  },
  {
    title: 'title (DESC)',
    sortType: 'price',
    order: 'desc',
  },
  {
    title: 'title (ASC)',
    sortType: 'price',
    order: 'asc',
  },
];

export const typeNames: string[] = ['small', 'traditional'];
