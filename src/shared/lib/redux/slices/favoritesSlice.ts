import { ProductT } from '@/shared/api/product/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FavoritesStateT = {
  items: ProductT[];
};

export const initialState: FavoritesStateT = {
  items: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    hydrateFavorites: (state, action: PayloadAction<ProductT[]>) => {
      state.items = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<ProductT>) => {
      const product = action.payload;
      const isProductExists = state.items.some((item) => item.id === product.id);

      if (!product?.id || !product.name || isProductExists) return;

      state.items.push(product);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  hydrateFavorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
