'use client';
import React from 'react';
import { RowProductCart } from '../../entities/row-product-cart';
import s from './CartTable.module.scss';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import { ProductCard } from '@/entities/product-card';
import { CartProduct } from '@/shared/lib/redux/slices/cartSlice';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

export const CartTable = ({ productsState }: { productsState: CartProduct[] }) => {
  const { isMobile } = useBreakpoint();

  return (
    <ReduxProvider>
      <div className={s.container} itemScope itemType="http://schema.org/ItemList">
        <div className={s.tableHeader}>
          <h6 className="h6">Наименование товара</h6>
          <h6 className="h6">Количество</h6>
          <h6 className="h6">Цена за шт.</h6>
          <h6 className="h6">Сумма (BYN)</h6>
        </div>
        {productsState.map((product) =>
          !isMobile ? (
            <RowProductCart {...product} key={product.id} />
          ) : (
            <ProductCard productInCart product={product} key={product.id} />
          )
        )}
      </div>
    </ReduxProvider>
  );
};
