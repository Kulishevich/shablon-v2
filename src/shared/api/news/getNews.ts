import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { NewsT } from './types';

export const getNews = async ({
  variant,
  slug,
}: {
  slug: string;
  variant?: string;
}): Promise<NewsT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/news/slug/${slug}`, {
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
