import { getPriceWithDiscount } from '../../utils/getPriceWithDiscount';
import { getPriceWithoutDiscount } from '../../utils/getPriceWithoutDiscount';
import { RootState } from '../store';

export const selectCartPriceWithOutDiscount = (state: RootState) =>
  getPriceWithoutDiscount(state.cart.items);

export const selectCartPriceWithDiscount = (state: RootState) =>
  getPriceWithDiscount(state.cart.items);

export const selectCartCountProducts = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
