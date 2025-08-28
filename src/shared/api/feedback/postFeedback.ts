import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { FeedbackPostT } from './types';

export const postFeedback = async ({
  variant,
  reqData,
}: {
  variant?: string;
  reqData: FeedbackPostT;
}) => {
  const res = await fetch(`${getApiBaseUrl(variant)}/v1/feedback`, {
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

  const data = await res.json();

  return data;
};
