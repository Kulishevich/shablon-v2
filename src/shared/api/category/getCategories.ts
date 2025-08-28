import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { CategoryT } from './types';

export const getCategories = async ({
  variant,
}: {
  variant?: string;
}): Promise<CategoryT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/categories?with_products_count=true`, {
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
