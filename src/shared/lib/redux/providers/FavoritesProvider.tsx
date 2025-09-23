'use client';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hydrateFavorites } from '../slices/favoritesSlice';
import { RootState } from '../store';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const favoritesData = localStorage.getItem('favorites_shablon');
    if (favoritesData) {
      dispatch(hydrateFavorites(JSON.parse(favoritesData)));
    }
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('favorites_shablon', JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'favorites_shablon' && event.newValue) {
        const parsed = JSON.parse(event.newValue);
        dispatch(hydrateFavorites(parsed));
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [dispatch]);

  if (!isHydrated) return null;

  return children;
};
