import { SeoBlock } from '@/entities/seo-block';
import { AdvantagesSection } from '../advantages-section';
import { BrandsSection } from '../brands-section';
import { GallerySection } from '../gallery-section/GallerySection';
import { ReviewsSection } from '../reviews-section';
import s from './ServiceContentSection.module.scss';
import clsx from 'clsx';
import { getPhotos } from '@/shared/api/photos/getPhotos';
import { getAdvantages } from '@/shared/api/advantages/getAdvantages';
import { getBrands } from '@/shared/api/brands/getBrands';
import { getReviews } from '@/shared/api/reviews/getReviews';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { ServiceHeroSection } from '../service-hero-section';
import { ServiceTextSection } from '../service-text-section';
import { AdvantageNumberCard } from '@/entities/advantage-number-card';
import { DropdownList } from '@/entities/dropdown-list';

const numberedAdvantages = [
  {
    number: '1',
    title: 'Просто ухаживать',
    description:
      'Плитка легко поддаётся уборке и очистке: загрязнения и пятна можно легко удалить, используя обычные чистящие средства',
  },
  {
    number: '2',
    title: 'Износостойкое и прочное',
    description:
      'Плитка отличается высокой прочностью, что делает её идеальным выбором для высоконагруженных зон',
  },
  {
    number: '3',
    title: 'Не подвержено воздействиям влаги',
    description:
      'Плиточное покрытие устойчиво к влаге, что делает его отличным вариантом для ванной',
  },
  {
    number: '4',
    title: 'Широкая цветовая палитра',
    description:
      'Плитка доступна в огромном ассортименте цветов и форм, что позволяет создавать уникальные интерьеры',
  },
];

export const ServiceContentSection = async ({
  variant,
  slug,
}: {
  variant?: string;
  slug: string;
}) => {
  const [advantages, brands, reviews, photos] = await Promise.all([
    getAdvantages({ variant }),
    getBrands({ variant }),
    getReviews({ variant }),
    getPhotos({ variant }),
  ]);
  return (
    <div className={s.wrapper}>
      <h1 className="h1">Услуга 1</h1>

      <div className={s.container}>
        <div className={clsx(s.navigation, 'desktop-only')}>
          <Link className={s.navBtn} href={`/services`}>
            Услуга 2
          </Link>
          <Link className={s.navBtn} href={`/services`}>
            Услуга 3
          </Link>
          <Link className={s.navBtn} href={`/services`}>
            Услуга 4
          </Link>
          <Link className={s.navBtn} href={`/services`}>
            Услуга 5
          </Link>
        </div>
        <div className={clsx(s.navigation, 'mobile-only')}>
          <DropdownList
            title="Услуга 1"
            items={[
              { title: 'Услуга 2', href: '/services/service-2' },
              { title: 'Услуга 3', href: '/services/service-3' },
              { title: 'Услуга 4', href: '/services/service-4' },
              { title: 'Услуга 5', href: '/services/service-5' },
            ]}
          />
        </div>
        <div className={s.content}>
          <ServiceHeroSection image={'/styles-1.png'} price="130" discount="110" />
          <ServiceTextSection />
          <div className={s.cardsContainer}>
            {numberedAdvantages?.map((advantage, index) => (
              <AdvantageNumberCard {...advantage} key={index} />
            ))}
          </div>
          <AdvantagesSection advantages={advantages} isMedium={true} />
          <BrandsSection className={s.brands} brands={brands} variant={variant} />
          <ReviewsSection reviews={reviews} variant={variant} className={s.reviews} />
          <GallerySection items={photos || []} isMedium={true} />
          <SeoBlock page={`/services/${slug}`} />
        </div>
      </div>
    </div>
  );
};
