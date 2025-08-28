import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { CategoryT } from './types';

export const getCategoryBySlug = async ({
  variant,
  slug,
}: {
  slug: string;
  variant: string;
}): Promise<CategoryT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/categories/slug/${slug}`, {
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
