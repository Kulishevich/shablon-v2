import React from 'react';
import s from './PopularProductsMobile.module.scss';
import { ProductCard } from '@/entities/product-card';
import { ProductT } from '@/shared/api/product/types';

export const PopularProductsMobile = ({ products }: { products: ProductT[] }) => {
  return (
    <div className={s.container}>
      <h2 className="h2">Популярные товары</h2>
      <div className={s.productsContainer} itemScope itemType="http://schema.org/ItemList">
        {products?.map((product, index) => <ProductCard product={product} key={index} />)}
      </div>
    </div>
  );
};
