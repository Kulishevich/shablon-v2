import { BrandCard } from '@/entities/brand-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { BrandT } from '@/shared/api/brands/types';
import React from 'react';

export const BrandsSection = ({
  brands,
  variant,
  className,
}: {
  brands: BrandT[] | null;
  variant?: string;
  className?: string;
}) => {
  return (
    <SliderWrapper
      title="Бренды, с которыми мы сотрудничаем"
      variant="news"
      itemsCount={brands?.length || 0}
      className={className}
    >
      {brands?.map((brand) => <BrandCard brand={brand} variant={variant} key={brand.id} />)}
    </SliderWrapper>
  );
};
