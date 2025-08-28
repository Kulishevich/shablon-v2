import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { TagT } from './types';

export const getTags = async ({
  variant,
  category,
}: {
  variant?: string;
  category?: string;
}): Promise<TagT[] | null> => {
  try {
    const categoryId = category ? `?category_id=${category}` : '';

    const res = await fetch(`${getApiBaseUrl(variant)}/v1/tags${categoryId}`, {
      next: {
        revalidate: 60,
      },
    });


    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
