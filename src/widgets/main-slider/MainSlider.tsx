'use client';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import s from './MainSlider.module.scss';
import { Button } from '@/shared/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared/assets';
import { Swiper as SwiperType } from 'swiper';
import { BannerT } from '@/shared/api/banners/types';
import Link from 'next/link';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const MainSlider = ({ slides, variant }: { slides: BannerT[]; variant?: string }) => {
  const swiperRef = useRef<SwiperType>(null);

  const handleNext = () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    if (swiper.isEnd) {
      swiper.slideTo(0);
    } else {
      swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    if (swiper.isBeginning) {
      swiper.slideTo(slides.length - 1);
    } else {
      swiper.slidePrev();
    }
  };

  return (
    <div className={s.wrapper}>
      <Swiper
        className={s.container}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} ${s.bullet}"></span>`;
          },
        }}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={s.slide}>
              <Image
                src={`${getStoreBaseUrl(variant)}/${slide.photo_path}`}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                loading={index === 0 ? 'eager' : 'lazy'}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLjgyPj4+ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              <div className={s.content}>
                <div>
                  {index === 0 ? (
                    <h1 className="h1">{slide.title}</h1>
                  ) : (
                    <h2 className="h1">{slide.title}</h2>
                  )}
                  <p className="body_1">{slide.subtitle}</p>
                </div>
                <Button as={Link} href={slide.button_link}>
                  Перейти в каталог
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={s.footer}>
        <div className={`custom-pagination ${s.pagination}`} />

        <div className={s.buttonsContainer}>
          {slides.length > 1 && (
            <Button variant="icon_banner_nav" onClick={handlePrev} aria-label="Слайд влево">
              <ArrowLeftIcon />
            </Button>
          )}
          {slides.length > 1 && (
            <Button variant="icon_banner_nav" onClick={handleNext} aria-label="Слайд вправо">
              <ArrowRightIcon />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
