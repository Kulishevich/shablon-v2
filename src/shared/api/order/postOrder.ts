import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { OrderPostT, OrderResponse } from './types';

export const postOrder = async ({
  reqData,
  variant,
}: {
  reqData: OrderPostT;
  variant?: string;
}): Promise<OrderResponse> => {
  const res = await fetch(`${getApiBaseUrl(variant)}/v1/orders`, {
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('Ошибка при отправке формы обратной связи');
  }

  const { data } = await res.json();

  return data;
};
