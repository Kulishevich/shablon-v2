import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ReviewT } from './types';

export const getReviews = async ({ variant }: { variant?: string }): Promise<ReviewT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/reviews`, {
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
