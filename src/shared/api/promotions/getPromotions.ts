import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PromotionsResponse } from './types';

type GetPromotionsProps = {
  page?: string;
  per_page?: string;
  variant?: string;
};

export const getPromotions = async ({
  page = '1',
  per_page = '9',
  variant,
}: GetPromotionsProps): Promise<PromotionsResponse | null> => {
  try {
    const params = new URLSearchParams();

    if (page) params.append('page', page);
    if (per_page) params.append('per_page', per_page);

    const url = `${getApiBaseUrl(variant)}/v1/promotions?${params.toString()}`;

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
