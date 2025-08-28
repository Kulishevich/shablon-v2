import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ReviewT } from './types';

export const getProductReview = async ({ variant, productId }: { variant?: string, productId: string }): Promise<ReviewT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/products/${productId}/reviews`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
