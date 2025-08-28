import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { BannerT } from './types';

export const getBanners = async ({ variant }: { variant?: string }): Promise<BannerT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/banners`, {
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
