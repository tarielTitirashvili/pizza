import { CartPizza } from '../types';
type GetCountAndPriceFromLS = {
  totalCount: number;
  totalPrice: number;
};

const getCountAndPriceFromLS = (pizzas: CartPizza[]): GetCountAndPriceFromLS => {
  let totalCount: number = 0;
  let totalPrice: number = 0;
  pizzas.forEach((pizza: CartPizza) => {
    totalCount = totalCount + pizza.quantity;
    totalPrice = totalPrice + pizza.price * pizza.quantity;
  });
  return {
    totalCount,
    totalPrice: Math.round(totalPrice*100)/100,
  };
};

export default getCountAndPriceFromLS;
