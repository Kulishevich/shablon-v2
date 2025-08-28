'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { CartProvider } from './CartProvider';
import { store } from '../store';

export const ReduxProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <CartProvider>{children}</CartProvider>
    </Provider>
  );
};
