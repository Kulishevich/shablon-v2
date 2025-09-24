'use client';
import React, { useRef } from 'react';
import s from './MainBannerSlider.module.scss';
import clsx from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SettingsT } from '@/shared/api/design/types';
import { MainBanner } from '../main-banner';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import { Swiper as SwiperType } from 'swiper';

export const MainBannerSlider = ({
  banners,
  variant,
}: {
  banners: SettingsT['main_banner'][];
  variant?: string;
}) => {
  const swiperRef = useRef<SwiperType>(null);

  return (
    <div className={s.container}>
      <Swiper
        className={s.swiper}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <MainBanner banner={banner} variant={variant} isInner={true} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.navigation}>
        <Button
          variant="icon_secondary"
          className={s.prev}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="icon_secondary"
          className={s.next}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
