import { ProductCard } from '@/entities/product-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import React from 'react';
import { ProductT } from '@/shared/api/product/types';
import { PopularProductsMobile } from './popular-products-mobile';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

export const PopularProductsSection = ({ products }: { products: ProductT[] | null }) => {
  return (
    <>
      <ReduxProvider>
        <SliderWrapper
          title="Популярные товары"
          className={'desktop-only'}
          itemsCount={products?.length || 0}
          itemScope
          itemType="http://schema.org/ItemList"
        >
          {products?.map((product, index) => <ProductCard key={index} product={product} />)}
        </SliderWrapper>
        <PopularProductsMobile products={products || []} />
      </ReduxProvider>
    </>
  );
};
