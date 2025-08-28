import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { DeliveryT } from './types';

export const getDeliveryMethods = async ({
  variant,
}: {
  variant?: string;
}): Promise<DeliveryT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/delivery-methods`, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
