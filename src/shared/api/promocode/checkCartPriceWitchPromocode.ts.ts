import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { PromocodeInCartT, PromocodeResponse } from './type';

export const checkCartPriceWitchPromocode = async ({
  reqData,
  variant,
}: {
  variant?: string;
  reqData: PromocodeInCartT;
}): Promise<PromocodeResponse> => {
  const res = await fetch(`${getApiBaseUrl(variant)}/v1/promo-codes/calculate-for-products`, {
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    throw new Error('Ошибка при отправке формы обратной связи');
  }

  const { data } = await res.json();

  return data;
};
