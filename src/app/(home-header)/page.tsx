import dynamic from 'next/dynamic';
import { getPopularProducts } from '@/shared/api/product/getPopularProducts';
import { getAdvantages } from '@/shared/api/advantages/getAdvantages';
import { getAllNews } from '@/shared/api/news/getAllNews';
import { getBanners } from '@/shared/api/banners/getBanners';
import { getSetting } from '@/shared/api/design/getSetting';
import { getContacts } from '@/shared/api/design/getContacts';
import { getCategories } from '@/shared/api/category/getCategories';
import { getBrands } from '@/shared/api/brands/getBrands';
import { getReviews } from '@/shared/api/reviews/getReviews';
import { Suspense } from 'react';
import { MainShortcuts } from '@/widgets/main-shortcuts';
import { CatalogProducts } from '@/widgets/catalog-products';
import { PopularProductsSection } from '@/widgets/popular-products-section';
import { AboutUsSection } from '@/widgets/about-us-section';
import { enrichProductsWithFullPath } from '@/shared/lib/utils/productUtils';
import { getTags } from '@/shared/api/tags/getTags';
import { cookies } from 'next/headers';
import { ProductsOfTheWeek } from '@/widgets/products-of-the-week';
import { TagsCards } from '@/widgets/tags-cards';
import { GallerySection } from '@/widgets/gallery-section/GallerySection';
import { getPhotos } from '@/shared/api/photos/getPhotos';
import { SharesSlider } from '@/widgets/shares-slider';
import { getPromotions } from '@/shared/api/promotions/getPromotions';
import { ProductsForYourCozyCorner } from '@/widgets/products-for-your-cozy-corner';
import { PreviouslyViewed } from '@/features/previously-viewed';
import { CompanyContactsSection } from '@/widgets/company-contacts-section';

// Критические компоненты для FCP
const MainSlider = dynamic(() => import('@/widgets/main-slider').then((mod) => mod.MainSlider), {
  loading: () => <div style={{ height: '400px', background: '#f5f5f5' }} />,
});

const SeoBlock = dynamic(() => import('@/entities/seo-block').then((mod) => mod.SeoBlock));
const ContactsSection = dynamic(() =>
  import('@/widgets/contacts-section').then((mod) => mod.ContactsSection)
);

const Feedback = dynamic(() => import('@/widgets/feedback/Feedback').then((mod) => mod.Feedback));
const ReviewsSection = dynamic(() =>
  import('@/widgets/reviews-section').then((mod) => mod.ReviewsSection)
);
const BrandsSection = dynamic(() =>
  import('@/widgets/brands-section').then((mod) => mod.BrandsSection)
);
const NewsSliderSection = dynamic(() =>
  import('@/widgets/news-slider-section').then((mod) => mod.NewsSliderSection)
);
const MainBanner = dynamic(() => import('@/widgets/main-banner').then((mod) => mod.MainBanner));

export default async function Home() {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const [
    popularProductsRaw,
    newsList,
    advantages,
    banners,
    setting,
    contacts,
    categories,
    brands,
    reviews,
    tags,
    photos,
    promotions,
  ] = await Promise.all([
    getPopularProducts({ variant }),
    getAllNews({ variant }),
    getAdvantages({ variant }),
    getBanners({ variant }),
    getSetting({ variant }),
    getContacts({ variant }),
    getCategories({ variant }),
    getBrands({ variant }),
    getReviews({ variant }),
    getTags({ variant }),
    getPhotos({ variant }),
    getPromotions({ variant }),
  ]);

  // Обогащаем популярные продукты полным путем
  const popularProducts = popularProductsRaw
    ? await enrichProductsWithFullPath({ products: popularProductsRaw, variant })
    : null;

  return (
    <main>
      <Suspense fallback={<div style={{ height: '400px', background: '#f5f5f5' }} />}>
        <MainSlider slides={banners || []} variant={variant} />
      </Suspense>
      <MainShortcuts tags={tags} variant={variant} />
      <CatalogProducts categories={categories} />
      <PopularProductsSection products={popularProducts} />

      <AboutUsSection
        text={setting?.about?.text || ''}
        image={setting?.about?.image || ''}
        variant={variant}
        advantages={advantages || []}
      />
      {/* Эндпоинта на ПРодукты недели еще нет поэтому пока популярные беру */}
      <ProductsOfTheWeek products={popularProducts} variant={variant} />

      <Suspense>
        <ReviewsSection reviews={reviews} variant={variant} />
      </Suspense>

      <TagsCards tags={tags} variant={variant} />

      <MainBanner banner={setting?.main_banner || null} variant={variant} />

      {!!brands?.length && (
        <Suspense>
          <BrandsSection brands={brands} variant={variant} />
        </Suspense>
      )}

      {!!newsList?.data?.length && (
        <Suspense>
          <NewsSliderSection newsList={newsList?.data} />
        </Suspense>
      )}
      {!!photos?.length && <GallerySection items={photos} />}
      <SharesSlider promotions={promotions} variant={variant} />

      {/* Не понятно что за Товары для вашего уютного уголка, пока что брал популярные*/}
      <ProductsForYourCozyCorner products={popularProducts} />

      <Suspense>
        <CompanyContactsSection contacts={contacts} isMain />
      </Suspense>

      <PreviouslyViewed variant={variant || ''} />

      <Suspense>
        <Feedback variant={variant} />
      </Suspense>

      <Suspense>
        <SeoBlock page="/main" />
      </Suspense>
    </main>
  );
}
