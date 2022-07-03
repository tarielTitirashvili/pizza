import { CartPizza } from '../types';
import getCountAndPriceFromLS from './getCountAndPriceFromLS';

type GetCartDetailsFromLS = {
  pizzas: CartPizza[];
  totalCount: number;
  totalPrice: number;
};

const getItemsFromLS = (): GetCartDetailsFromLS => {
  const pizzasLS = localStorage.getItem('pizzas');
  if (pizzasLS === null) {
    return {
      pizzas: [],
      totalCount: 0,
      totalPrice: 0,
    };
  }
  const pizzas = JSON.parse(pizzasLS);
  const { totalCount, totalPrice } = getCountAndPriceFromLS(pizzas);
  return {
    pizzas,
    totalCount,
    totalPrice,
  };
};
export default getItemsFromLS;
