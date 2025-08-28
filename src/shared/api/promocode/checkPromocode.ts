import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { CheckPromocodeT } from './type';

export const checkPromocode = async ({
  reqData,
  variant,
}: {
  reqData: CheckPromocodeT;
  variant: string;
}) => {
  const res = await fetch(`${getApiBaseUrl(variant)}/v1/promo-codes/check`, {
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
