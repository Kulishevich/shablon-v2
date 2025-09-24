'use client';
import React, { useRef } from 'react';
import s from './SubcategoriesSlider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CategoryT } from '@/shared/api/category/types';
import { SecondCardCategory } from '@/entities/second-card-category';
import clsx from 'clsx';

export const SubcategoriesSlider = ({
  subcategories,
  variant,
  className,
  categoryPath,
}: {
  subcategories: CategoryT[];
  variant?: string;
  className?: string;
  categoryPath?: CategoryT[];
}) => {
  return (
    <div className={clsx(s.container, className)}>
      <Swiper
        className={s.swiper}
        slidesPerView={'auto'}
        spaceBetween={24}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
      >
        {subcategories.map((subcategory, index) => (
          <SwiperSlide key={index} className={s.slide}>
            <SecondCardCategory
              {...subcategory}
              variant={variant}
              className={s.slideCategory}
              categoryPath={categoryPath}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
