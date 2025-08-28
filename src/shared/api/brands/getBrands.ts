import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { BrandT } from './types';

export const getBrands = async ({ variant }: { variant?: string }): Promise<BrandT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/brands`, {
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
