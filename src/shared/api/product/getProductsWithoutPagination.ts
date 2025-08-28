import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ProductT } from './types';

type GetProductsWithoutPaginationProps = {
  search?: string;
  category_id?: string;
  tags?: string;
  variant?: string;
};

export const getProductsWithoutPagination = async ({
  search,
  category_id,
  tags,
  variant,
}: GetProductsWithoutPaginationProps): Promise<ProductT[] | null> => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (category_id) params.append('category_id', category_id);
  if (tags) params.append('tags', tags);

  const url = `${getApiBaseUrl(variant)}/v1/products/all?${params.toString()}`;

  try {
    const res = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
