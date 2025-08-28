import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { NewsMaskT } from './types';
import { NewsT } from '../news/types';
import { replaceNewsMaskTemplates } from '@/shared/lib/utils/replaceNewsMaskTemplates';



export const getNewsMask = async ({
  variant,
  news,
}: {
  variant?: string;
  news: NewsT;
}): Promise<NewsMaskT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/meta-tags/news/${news.id}`, {
      next: {
        revalidate: 60,
      },
    });


    const data = await res.json();


    if (data) {
      const processedMask = replaceNewsMaskTemplates(data, news);

      return processedMask;
    }


    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
