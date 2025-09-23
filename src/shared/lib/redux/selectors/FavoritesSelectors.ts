import { RootState } from '../store';

export const selectFavoritesItems = (state: RootState) => state.favorites.items;

export const selectFavoritesCount = (state: RootState) => state.favorites.items.length;

export const selectIsInFavorites = (productId: number) => (state: RootState) =>
  state.favorites.items.some((item) => item.id === productId);
