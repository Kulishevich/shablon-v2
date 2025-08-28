import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ProductMaskT } from './types';
import { replaceProductMaskTemplates } from '@/shared/lib/utils/replaceProductMaskTemplates';
import { ProductT } from '../product/types';



export const getProductMask = async ({
  variant,
  product,
}: {
  variant?: string;
  product: ProductT;
}): Promise<ProductMaskT | null> => {
  try {
    const res = await fetch(`${getApiBaseUrl(variant)}/v1/meta-tags/product/${product.id}`, {
      next: {
        revalidate: 60,
      },
    });


    const data = await res.json();


    if (data) {
      const processedMask = replaceProductMaskTemplates(data, product);

      return processedMask;
    }


    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
