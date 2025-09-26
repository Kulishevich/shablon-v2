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


/**
 * Находит полный путь категории в дереве категорий
 */
export const findCategoryPath = (
  categories: CategoryT[],
  targetCategoryId: number,
  currentPath: CategoryT[] = []
): CategoryT[] | null => {
  for (const category of categories) {
    const newPath = [...currentPath, category];

    if (category.id === targetCategoryId) {
      return newPath;
    }

    if (category.subcategories && category.subcategories.length > 0) {
      const found = findCategoryPath(category.subcategories, targetCategoryId, newPath);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

/**
 * Создает полный URL для категории на основе её пути в иерархии
 */
export const buildFullCategoryUrl = (categoryPath: CategoryT[]): string => {
  const slugs = categoryPath.map(category => category.slug);
  return `${paths.catalog}/${slugs.join('/')}`;
};


export type CategoryWithPath = CategoryT & {
  fullPath: CategoryT[];
  fullUrl: string;
};


export const searchCategoriesDeep = (
  categories: CategoryT[],
  searchTerm: string
): CategoryWithPath[] => {
  const result: CategoryWithPath[] = [];
  const searchTermLower = searchTerm.toLowerCase();

  const searchInCategory = (category: CategoryT, currentPath: CategoryT[] = []): void => {
    const fullPath = [...currentPath, category];
    const matchesName = category.name.toLowerCase().includes(searchTermLower);

    if (matchesName) {
      result.push({
        ...category,
        fullPath,
        fullUrl: buildFullCategoryUrl(fullPath)
      });
    }

    if (category.subcategories && category.subcategories.length > 0) {
      category.subcategories.forEach(subcategory =>
        searchInCategory(subcategory, fullPath)
      );
    }
  };

  categories.forEach(category => searchInCategory(category));
  return result;
}; 