import { getApiBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { ProductsResponseT } from './types';

type GetProductsProps = {
  variant?: string;
  search?: string;
  category_id?: string;
  popular?: string;
  novelty?: string;
  price_from?: string;
  price_to?: string;
  sort_by?: string;
  sort_direction?: string;
  brand?: string;
  page?: string;
  per_page?: string;
  tags?: string;
  filters?: Record<string, string[]>;
};

export const getProducts = async ({
  variant,
  search,
  category_id,
  popular,
  novelty,
  price_from,
  price_to,
  sort_by,
  sort_direction,
  brand,
  tags,
  filters,
  page = '1',
  per_page = '9',
}: GetProductsProps): Promise<ProductsResponseT | null> => {
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (category_id) params.append('category_id', category_id);
  if (popular) params.append('popular', popular);
  if (novelty) params.append('novelty', novelty);
  if (price_from) params.append('price_from', price_from);
  if (price_to) params.append('price_to', price_to);
  if (sort_by) params.append('sort_by', sort_by);
  if (sort_direction) params.append('sort_direction', sort_direction);
  if (brand) params.append('brand', brand);
  if (page) params.append('page', page);
  if (per_page) params.append('per_page', per_page);
  if (tags) params.append('tags', tags);

  // Добавляем фильтры в формате filters[id][]=value
  if (filters) {
    Object.entries(filters).forEach(([filterId, values]) => {
      values.forEach(value => {
        params.append(`filters[${filterId}][]`, value);
      });
    });
  }

  const url = `${getApiBaseUrl(variant)}/v1/products?${params.toString()}`;

  try {
    const res = await fetch(url, {
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
