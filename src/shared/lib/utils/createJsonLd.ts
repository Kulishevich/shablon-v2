import { ProductT } from '@/shared/api/product/types';
import { ReviewT } from '@/shared/api/reviews/types';
import { getStoreBaseUrl } from './getBaseUrl';

/**
 * Создает JSON-LD микроразметку для продукта
 * @param product - данные продукта
 * @param reviews - массив отзывов о продукте
 * @param variant - вариант сайта (из cookies)
 * @param storeName - название магазина
 * @returns JSON строка с микроразметкой
 */
export const createProductJsonLd = (
  product: ProductT,
  reviews: ReviewT[] | null,
  variant: string | undefined,
  storeName: string = 'Название вашего магазина'
): string => {
  const baseUrl = getStoreBaseUrl(variant);

  // Подсчет средней оценки из отзывов
  const averageRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null;

  // Создание массива изображений
  const images = product.images?.map((img) => `${baseUrl}/${img.image_path}`) || [];
  if (product.main_image?.image_path) {
    images.unshift(`${baseUrl}/${product.main_image.image_path}`);
  }

  // Создание массива отзывов
  const reviewsData =
    reviews?.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author_name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
      },
      reviewBody: review.review_text,
      datePublished: review.published_at,
      name: review.title,
    })) || [];

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: images,
    description: product.description,
    sku: product.sku,
    brand: product.brand
      ? {
        '@type': 'Brand',
        name: product.brand.name,
        logo: `${baseUrl}/${product.brand.image_path}`,
      }
      : undefined,
    category: product.category?.name,
    offers: {
      '@type': 'Offer',
      url: typeof window !== 'undefined' ? window.location.href : '',
      priceCurrency: 'BYN',
      price: parseFloat(product.price),
      availability: product.is_active
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: storeName,
      },
    },
    ...(averageRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        reviewCount: reviews?.length || 0,
      },
    }),
    ...(reviewsData.length > 0 && { review: reviewsData }),
  };

  return JSON.stringify(jsonLd);
};
