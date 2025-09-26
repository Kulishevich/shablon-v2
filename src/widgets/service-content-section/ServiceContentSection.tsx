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
        <div className={s.navigation}>
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
        <div className={s.content}>
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
