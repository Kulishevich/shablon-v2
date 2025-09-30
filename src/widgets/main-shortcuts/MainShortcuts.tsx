'use client';
import React, { useRef } from 'react';
import s from './MainShortcuts.module.scss';
import { ShortcutCard } from '@/entities/shortcut-card/ShortcutCard';
import { TagT } from '@/shared/api/tags/types';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets/index';

export const MainShortcuts = ({ tags, variant }: { tags: TagT[] | null; variant?: string }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <div className={s.container}>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={36}
        breakpoints={{
          768: {
            slidesPerView: 'auto',
            spaceBetween: 48,
          },
        }}
        className={s.swiper}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {tags?.map((tag) => (
          <SwiperSlide key={tag.id} className={s.slide}>
            <ShortcutCard tag={tag} variant={variant} />
          </SwiperSlide>
        ))}
      </Swiper>

      {tags && tags.length > 6 && (
        <div className={s.nav}>
          <Button
            variant="icon_secondary"
            className={s.iconLeft}
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Слайд влево"
          >
            <ArrowLeftIcon />
          </Button>
          <Button
            variant="icon_secondary"
            className={s.iconRight}
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Слайд вправо"
          >
            <ArrowRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
};
