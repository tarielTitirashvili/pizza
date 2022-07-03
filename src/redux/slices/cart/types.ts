import { CartPizza } from "../../../types";

export interface CartState {
  totalPrice: number;
  totalCount: number;
  pizzas: CartPizza[];
}
