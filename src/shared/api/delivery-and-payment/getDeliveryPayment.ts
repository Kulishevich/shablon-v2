import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PaymentAndDeliveryT } from './types';

export const getDeliveryAndPayment = async ({
  variant,
}: {
  variant?: string;
}): Promise<PaymentAndDeliveryT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/delivery-payment-blocks`, {
      next: {
        revalidate: 60,
      },
    });

    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
