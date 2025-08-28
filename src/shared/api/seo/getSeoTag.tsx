import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { SeoT } from './types';

export const getSeoTag = async ({
  variant,
  tag,
}: {
  variant?: string;
  tag: string;
}): Promise<SeoT | null> => {
  try {
    const data = await fetch(`${getApiBaseUrl(variant)}/v1/seo/tag?name=${tag}`, {
      next: {
        revalidate: 60,
      },
    });

    const res = await data.json();

    return res;
  } catch (err) {
    return null;
  }
};
