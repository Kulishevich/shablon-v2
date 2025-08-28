import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ProductAdvantageType } from './types';

export const getProductsAdvantages = async ({
  variant,
}: {
  variant?: string;
}): Promise<ProductAdvantageType[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/product-advantages`, {
      next: {
        revalidate: 60,
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
