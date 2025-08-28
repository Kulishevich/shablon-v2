import { CategoryT } from '@/shared/api/category/types';
import { paths } from '@/shared/config/constants/paths';

/**
 * Создает URL для категории на основе массива категорий в пути
 */
export const buildCategoryUrl = (categoryPath: CategoryT[]): string => {
  const slugs = categoryPath.map(category => category.slug);
  return `${paths.catalog}/${slugs.join('/')}`;
};

/**
 * Создает URL для категории на основе отдельных slug'ов
 */
export const buildCategoryUrlFromSlugs = (slugs: string[]): string => {
  return `${paths.catalog}/${slugs.join('/')}`;
};

/**
 * Извлекает slug'и из пути категории
 */
export const extractSlugsFromPath = (path: string): string[] => {
  return path.replace(paths.catalog, '').split('/').filter(Boolean);
}; 