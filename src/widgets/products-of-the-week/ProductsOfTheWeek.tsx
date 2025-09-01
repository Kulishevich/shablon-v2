import React from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import clsx from 'clsx';
import { ProductT } from '@/shared/api/product/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ShoppingCartIcon } from '@/shared/assets';
import { ProductOfTheWeekCard } from './ProductOfTheWeekCard';

interface ProductsOfTheWeekProps {
  products: ProductT[] | null;
  variant?: string;
}

export const ProductsOfTheWeek = ({ products, variant }: ProductsOfTheWeekProps) => {
  return (
    products && (
      <div className={s.container}>
        <div className={s.firstBlock}>
          <h2 className={'h2'}>Товары недели</h2>
          <div className={s.cardsList}>
            {products.slice(0, 8).map((product) => (
              <ProductOfTheWeekCard {...product} variant={variant} />
            ))}
          </div>
        </div>

        <div className={s.secondBlock}>
          <div className={s.content}>
            <h2 className={clsx(s.title, 'h2')}>-15%</h2>
            <p className={clsx(s.description, 'body_2')}>на товары недели</p>
            <Button variant={'secondary'} className={s.catalogLink}>
              Перейти в каталог
            </Button>
          </div>

          <Image
            src={'/product-of-the-week-background.png'}
            fill
            alt="Products of the week banner"
          />
        </div>
      </div>
    )
  );
};
