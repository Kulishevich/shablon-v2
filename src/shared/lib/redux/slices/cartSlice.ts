import { ProductT } from '@/shared/api/product/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartProduct = ProductT & { quantity: number };

export type CartStateT = {
  items: CartProduct[];
  promocode: string;
};

export const initialState: CartStateT = {
  items: [],
  promocode: '',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    hydrateCart: (state, action: PayloadAction<CartProduct[]>) => {
      state.items = action.payload;
    },
    addInCart: (state, action: PayloadAction<CartProduct>) => {
      const productIndex = state.items.findIndex((elem) => elem.id === action.payload.id);
      const product = action.payload;

      if (!product?.id || !product.name || !product.quantity) return;

      if (productIndex !== -1) {
        state.items[productIndex].quantity += product.quantity;
      } else {
        state.items.push(product);
      }
    },
    deleteFromCart: (state, action: PayloadAction<number>) => {
      const newArr = state.items.filter((elem) => elem.id !== action.payload);

      state.items = newArr;
    },
    clearCart: (state) => {
      state.items = [];
    },
    changeProductCount: (state, action: PayloadAction<{ id: number; count: number }>) => {
      const { id, count } = action.payload;
      const item = state.items.find((elem) => elem.id === id);
      if (item) {
        item.quantity = count;
      }
    },
    setPromocode: (state, action: PayloadAction<string>) => {
      state.promocode = action.payload;
    },
    clearPromocode: (state) => {
      state.promocode = '';
    },
  },
});

export const {
  addInCart,
  deleteFromCart,
  clearCart,
  hydrateCart,
  changeProductCount,
  setPromocode,
  clearPromocode,
} = cartSlice.actions;

export default cartSlice.reducer;
