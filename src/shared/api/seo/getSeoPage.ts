import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { SeoPageT } from './types';

export const getSeoPage = async ({
  page,
  variant,
}: {
  page: string;
  variant?: string;
}): Promise<SeoPageT | null> => {
  try {
    const data = await fetch(`${getApiBaseUrl(variant)}/v1/seo/text?page=${page}`, {
      next: {
        revalidate: 60,
      },
    });

    const res = await data.json();

    if (!res.success) {
      return null;
    }

    return res;
  } catch (error) {
    return null;
  }
};
