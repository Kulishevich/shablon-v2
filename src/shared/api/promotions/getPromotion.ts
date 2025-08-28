import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PromotionsResponse, PromotionT } from './types';

export const getPromotion = async ({
  slug,
  variant,
}: {
  variant?: string;
  slug: string;
}): Promise<PromotionT | null> => {
  try {
    const url = `${getApiBaseUrl(variant)}/v1/promotions/slug/${slug}`;

    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
