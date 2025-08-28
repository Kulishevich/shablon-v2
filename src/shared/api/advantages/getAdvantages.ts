import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { AdvantageType } from './types';

export const getAdvantages = async ({
  variant,
}: {
  variant?: string;
}): Promise<AdvantageType[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/advantages`, {
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
