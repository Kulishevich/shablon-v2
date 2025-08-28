import { ISitemapField } from 'next-sitemap';
import { CategoryT } from './types';

export type CategoryWithSubcategories = Omit<CategoryT, 'subcategories'> & {
  subcategories?: CategoryWithSubcategories[];
};

export const processCategoryTree = (categories: CategoryWithSubcategories[], parentPath: string = ''): ISitemapField[] => {
  let fields: ISitemapField[] = [];

  categories.forEach((category) => {
    const currentPath = parentPath ? `${parentPath}/${category.slug}` : category.slug;

    fields.push({
      loc: `${process.env.NEXT_PUBLIC_SITE_URL}/catalog/${currentPath}`,
      lastmod: new Date(category.updated_at || new Date()).toISOString(),
      changefreq: 'daily' as const,
      priority: 0.8,
    });

    if (category.subcategories && category.subcategories.length > 0) {
      fields = [...fields, ...processCategoryTree(category.subcategories, currentPath)];
    }
  });

  return fields;
}; 