import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ProductT } from './types';

export const getPopularProducts = async ({
  variant,
}: {
  variant?: string;
}): Promise<ProductT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/products/popular`, {
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
