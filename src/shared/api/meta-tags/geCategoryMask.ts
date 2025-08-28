import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { CategoryMaskT } from './types';
import { CategoryT } from '../category/types';
import { replaceCategoryMaskTemplates } from '@/shared/lib/utils/replaceCategoryMaskTemplates';



export const geCategoryMask = async ({
  variant,
  category,
}: {
  variant?: string;
  category: CategoryT;
}): Promise<CategoryMaskT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/meta-tags/category/${category.id}`, {
      next: {
        revalidate: 60,
      },
    });


    const data = await res.json();


    if (data) {
      const processedMask = replaceCategoryMaskTemplates(data, category);

      return processedMask;
    }


    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
