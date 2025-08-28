import { CartProduct } from '../redux/slices/cartSlice';

export const getPriceWithDiscount = (arr: CartProduct[]) => {
  return arr.reduce((sum, elem) => {
    sum += Number(elem.price) * ((100 - Number(elem.discount)) / 100) * elem.quantity;
    return sum;
  }, 0);
};
