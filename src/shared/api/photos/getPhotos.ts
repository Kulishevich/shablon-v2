import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PhotoT } from './types';

export const getPhotos = async ({ variant }: { variant?: string }): Promise<PhotoT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/photos`, {
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
