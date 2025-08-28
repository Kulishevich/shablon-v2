import { FilterT } from '@/shared/api/product/types';

/**
 * Преобразует URL параметры фильтров в формат для API
 * @param searchParams - объект с URL параметрами
 * @param availableFilters - доступные фильтры с их ID и slug
 * @returns объект фильтров в формате {id: [values]} для API
 */
export function parseFiltersFromSearchParams(
  searchParams: Record<string, string | undefined>,
  availableFilters: FilterT[]
): Record<string, string[]> | undefined {
  const filters: Record<string, string[]> = {};
  let hasFilters = false;

  availableFilters.forEach((filter) => {
    const paramValue = searchParams[filter.slug];
    if (paramValue) {
      // Значения в URL разделены символом |
      const values = paramValue.split('|').filter(Boolean);
      if (values.length > 0) {
        filters[filter.id.toString()] = values;
        hasFilters = true;
      }
    }
  });

  return hasFilters ? filters : undefined;
}
