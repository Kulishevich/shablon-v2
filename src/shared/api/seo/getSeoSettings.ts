import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { SeoSettingsT } from './types';

export const getSeoSettings = async ({
  variant,
}: {
  variant?: string;
}): Promise<SeoSettingsT | null> => {
  try {
    const data = await fetch(`${getApiBaseUrl(variant)}/v1/seo/settings`, {
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
