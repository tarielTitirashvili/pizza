import { CartPizza } from '../../../types';
import { RootState } from '../../store/store';
import { PizzasState } from './types';

export const selectPizzas = (state: RootState): PizzasState => state.pizzas;
export const selectPizzaById =
  (id: number, selectedSize: number, selectedType: number) =>
  (state: RootState): CartPizza | undefined =>
    state.cart.pizzas.find(
      (obj) => obj.id === id && obj.sizes === selectedSize && obj.types === selectedType,
    );
