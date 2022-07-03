import { Pizza } from "../../../types";

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzasState {
  pizzas: Pizza[];
  status: Status;
}
