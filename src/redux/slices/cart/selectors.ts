import { RootState } from '../../store/store';
import { CartState } from './types';

export const selectCart = (state: RootState): CartState => state.cart;
