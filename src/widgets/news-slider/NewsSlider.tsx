'use client';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';
import { NewsCard } from '@/entities/news-card';
import { NewsT } from '@/shared/api/news/types';

interface NewsSlider {
  newsList: NewsT[] | null;
  variant?: string;
  title: string;
}

export const NewsSlider = ({ title, newsList, variant }: NewsSlider) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className={s.container}>
      <div className={s.header}>
        <h2 className="h2">{title}</h2>
        <Button as={Link} href={`${paths.news}`} className={s.sharesLink}>
          Все новости
        </Button>
      </div>

      <div className={s.swiperContainer}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: `.${s.next}`,
            prevEl: `.${s.prev}`,
          }}
          spaceBetween={16}
          breakpoints={{
            768: {
              spaceBetween: 24,
            },
          }}
          slidesPerView={'auto'}
          className={s.promotionsList}
        >
          {newsList?.map((news) => (
            <SwiperSlide className={s.slide} key={news.id}>
              <NewsCard news={news} variant={variant} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s.btnsContainer}>
          <Button variant="icon_secondary" className={s.prev}>
            <ArrowLeftIcon />
          </Button>
          <Button variant="icon_secondary" className={s.next}>
            <ArrowRightIcon />
          </Button>

          <Button as={Link} href={`${paths.news}`} className={s.sharesLinkMobile}>
            Все новости
          </Button>
        </div>
      </div>
    </div>
  );
};
