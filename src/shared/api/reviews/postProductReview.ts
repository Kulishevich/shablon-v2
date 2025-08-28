import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ReviewPostResponseT, ReviewPostT } from './types';

export const postProductReview = async ({
  review,
  variant,
  productId,
}: {
  variant?: string;
  review: ReviewPostT;
  productId: string;
}): Promise<ReviewPostResponseT | null> => {
  try {
    const formData = new FormData();
    formData.append('name', review.name);
    formData.append('phone', review.phone);
    formData.append('title', review.title);
    formData.append('comment', review.comment || '');
    formData.append('rating', review.rating.toString());
    if (review.photo) {
      formData.append('author_photo', review.photo);
    }

    const res = await fetch(`${getApiBaseUrl(variant)}/v1/products/${productId}/reviews`, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
