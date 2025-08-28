import { CategoryMaskT } from '@/shared/api/meta-tags/types';
import { CategoryT } from '@/shared/api/category/types';

/**
 * Заменяет шаблонные строки в полях CategoryMaskT на соответствующие значения из категории
 * 
 * @param mask - объект CategoryMaskT с шаблонными строками
 * @param category - данные категории для замены
 * @param parentCategory - родительская категория (опционально)
 * @returns объект CategoryMaskT с замененными значениями
 */
export const replaceCategoryMaskTemplates = (
  mask: CategoryMaskT,
  category: CategoryT,
  parentCategory?: CategoryT | null
): CategoryMaskT => {
  const replacements: Record<string, string> = {
    '{{название категории}}': category.name,
    '{{Название категории}}': category.name,
    '{{описание категории}}': category.description || '',
    '{{Описание категории}}': category.description || '',
    '{{родительская категория}}': parentCategory?.name || '',
    '{{Родительская категория}}': parentCategory?.name || '',
    '{{количество товаров}}': category.products_count?.toString() || '',
    '{{Количество товаров}}': category.products_count?.toString() || '',
  };

  const replaceTemplates = (text: string): string => {
    let result = text;
    Object.entries(replacements).forEach(([template, value]) => {
      result = result.replace(new RegExp(template.replace(/[{}]/g, '\\$&'), 'g'), value);
    });
    return result;
  };

  return {
    title: replaceTemplates(mask.title),
    description: replaceTemplates(mask.description),
    keywords: replaceTemplates(mask.keywords),
  };
};
