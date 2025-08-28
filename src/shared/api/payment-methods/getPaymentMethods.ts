import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PaymentT } from './types';

export const getPaymentMethods = async ({
  variant,
}: {
  variant?: string;
}): Promise<PaymentT[] | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/payment-methods`, {
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
