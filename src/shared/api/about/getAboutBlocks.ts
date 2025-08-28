import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { AboutBlockType } from './types';

export const getAboutBlocks = async ({
  variant,
}: {
  variant?: string;
}): Promise<AboutBlockType | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/design/settings`, {
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
