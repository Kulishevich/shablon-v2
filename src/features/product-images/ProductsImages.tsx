'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import s from './ProductsImages.module.scss';
import { ProductT } from '@/shared/api/product/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Cookies from 'js-cookie';
import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';

// Импорт стилей Swiper
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const ProductsImages = ({ product }: { product: ProductT | null }) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperType>(null);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  if (!product || !product.images || product.images.length === 0) {
    return null;
  }

  // Создаем массив всех изображений (главное + дополнительные)
  const allImages = product.main_image ? [product.main_image, ...product.images] : product.images;

  return (
    <div className={s.images} itemScope itemType="http://schema.org/ImageGallery">
      {/* Основной слайдер */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className={s.mainSwiper}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {allImages.map((image, index) => (
          <SwiperSlide key={index} className={s.mainSlide}>
            <div className={s.imageContainer}>
              <Image
                itemProp="image"
                src={`${getStoreBaseUrl(variant)}/${image.image_path}`}
                fill
                alt={`Product image ${index + 1}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails слайдер */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={16}
        slidesPerView={'auto'}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className={s.thumbsSwiper}
        breakpoints={{
          640: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 6,
          },
        }}
      >
        {allImages.map((image, index) => (
          <SwiperSlide key={index} className={s.thumbSlide}>
            <div className={s.thumbImage}>
              <Image
                src={`${getStoreBaseUrl(variant)}/${image.image_path}`}
                fill
                alt={`Thumbnail ${index + 1}`}
                sizes="80px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.navigation}>
        <Button
          variant="icon_secondary"
          className={s.iconLeft}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          variant="icon_secondary"
          className={s.iconRight}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};
