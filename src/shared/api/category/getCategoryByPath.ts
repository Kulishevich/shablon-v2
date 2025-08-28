import { CategoryT } from './types';
import { getCategoriesTree } from './getCategoriesTree';

export const getCategoryByPath = async ({
  slugs,
  variant,
}: {
  variant?: string;
  slugs: string[];
}): Promise<{
  category: CategoryT | null;
  categoryPath: CategoryT[];
}> => {
  try {
    const categoriesTree = await getCategoriesTree({ variant });

    if (!categoriesTree || slugs.length === 0) {
      return { category: null, categoryPath: [] };
    }

    const categoryPath: CategoryT[] = [];
    let currentCategories = categoriesTree;
    let targetCategory: CategoryT | null = null;

    // Проходим по каждому slug в пути
    for (const slug of slugs) {
      const foundCategory = currentCategories.find((cat) => cat.slug === slug);

      if (!foundCategory) {
        return { category: null, categoryPath: [] };
      }

      categoryPath.push(foundCategory);
      targetCategory = foundCategory;
      currentCategories = (foundCategory.subcategories || []) as CategoryT[];
    }

    return {
      category: targetCategory,
      categoryPath,
    };
  } catch (err) {
    console.log(err);
    return { category: null, categoryPath: [] };
  }
};
