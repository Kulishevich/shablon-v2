'use client';
import { ProductCard } from '@/entities/product-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import React, { useState } from 'react';
import { ProductT } from '@/shared/api/product/types';
import { ProductsForYourCozyCornerMobile } from './products-for-your-cozy-corner-mobile';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

export const ProductsForYourCozyCorner = ({ products }: { products: ProductT[] | null }) => {
  const tags = products
    ?.flatMap((elem) => elem.tags)
    .filter((tag, index, self) => index === self.findIndex((t) => t.id === tag.id));
  const [activeTag, setActiveTag] = useState<number | null>(null);

  const filteredProducts = !!activeTag
    ? products?.filter((product) => product.tags.some((tag) => tag.id === activeTag))
    : products;

  return (
    <>
      <ReduxProvider>
        <SliderWrapper
          title="Товары для вашего уютного уголка"
          className={'desktop-only'}
          itemsCount={products?.length || 0}
          itemScope
          itemType="http://schema.org/ItemList"
          tags={tags || []}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        >
          {filteredProducts?.map((product, index) => <ProductCard key={index} product={product} />)}
        </SliderWrapper>
        <ProductsForYourCozyCornerMobile
          products={products || []}
          tags={tags || []}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
      </ReduxProvider>
    </>
  );
};
