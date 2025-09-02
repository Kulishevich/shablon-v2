'use client';
import React from 'react';
import s from './styles.module.scss';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { PromotionsResponse } from '@/shared/api/promotions/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { DiscountCard } from '@/entities/discount-card';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';

interface SharesSlider {
  promotions: PromotionsResponse | null;
  variant?: string;
}

export const SharesSlider = ({ promotions, variant }: SharesSlider) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className="h2">Акции</h2>
        <Button as={Link} href={`${paths.shares}`} className={s.sharesLink}>
          Все акции
        </Button>
      </div>

      <div className={s.swiperContainer}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.${s.next}`,
            prevEl: `.${s.prev}`,
          }}
          breakpoints={{
            0: {
              spaceBetween: 16,
            },
            1024: {
              spaceBetween: 24,
            },
          }}
          slidesPerView={'auto'}
          className={s.promotionsList}
          loop={true}
        >
          {promotions?.data.map((promotion) => (
            <SwiperSlide className={s.slide} key={promotion.id}>
              <DiscountCard {...promotion} variant={variant} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s.btnsContainer}>
          <Button variant="icon_secondary" className={`${s.navBtn} ${s.prev}`}>
            <ArrowLeftIcon />
          </Button>
          <Button variant="icon_secondary" className={`${s.navBtn} ${s.next}`}>
            <ArrowRightIcon />
          </Button>

          <Button as={Link} href={`${paths.shares}`} className={s.sharesLinkMobile}>
            Все акции
          </Button>
        </div>
      </div>
    </div>
  );
};
