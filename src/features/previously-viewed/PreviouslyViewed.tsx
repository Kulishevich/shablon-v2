'use client';
import { SliderWrapper } from '@/entities/slider-wrapper';
import React, { useEffect, useState } from 'react';
import { ProductT } from '@/shared/api/product/types';
import SectionAnimationWrapper from '@/shared/ui/section/SectionAnimationWrapper';
import { ProductCard } from '@/entities/product-card/ProductCard';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

export const PreviouslyViewed = () => {
  const [viewedProducts, setViewedProducts] = useState<ProductT[]>([]);

  const getViewedProductIds = (): ProductT[] => {
    try {
      return JSON.parse(localStorage.getItem('viewed_products_shablon') || '[]');
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const products = getViewedProductIds();
    setViewedProducts(products);
  }, []);

  return (
    <ReduxProvider>
      <SectionAnimationWrapper>
        {!!viewedProducts.length && (
          <SliderWrapper
            title={'Вы недавно смотрели'}
            variant="mini_product"
            itemsCount={viewedProducts?.length}
            itemScope
            itemType="http://schema.org/ItemList"
          >
            {viewedProducts.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </SliderWrapper>
        )}
      </SectionAnimationWrapper>
    </ReduxProvider>
  );
};
