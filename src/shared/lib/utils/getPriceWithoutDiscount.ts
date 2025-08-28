import { CartProduct } from '../redux/slices/cartSlice';

export const getPriceWithoutDiscount = (arr: CartProduct[]) => {
  return arr.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
};
