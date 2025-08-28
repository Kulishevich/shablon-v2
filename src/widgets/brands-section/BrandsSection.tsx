import { BrandCard } from '@/entities/brand-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { BrandT } from '@/shared/api/brands/types';
import React from 'react';

export const BrandsSection = ({
  brands,
  variant,
}: {
  brands: BrandT[] | null;
  variant?: string;
}) => {
  return (
    <SliderWrapper
      title="Бренды, с которыми мы сотрудничаем"
      variant="news"
      itemsCount={brands?.length || 0}
    >
      {brands?.map((brand) => <BrandCard brand={brand} variant={variant} key={brand.id} />)}
    </SliderWrapper>
  );
};
