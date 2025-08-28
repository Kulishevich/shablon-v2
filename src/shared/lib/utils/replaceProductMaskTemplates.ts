import { ProductMaskT } from '@/shared/api/meta-tags/types';
import { ProductT } from '@/shared/api/product/types';

/**
 * Заменяет шаблонные строки в полях ProductMaskT на соответствующие значения из продукта
 * 
 * @param mask - объект ProductMaskT с шаблонными строками
 * @param product - данные продукта для замены
 * @returns объект ProductMaskT с замененными значениями
 */
export const replaceProductMaskTemplates = (
  mask: ProductMaskT,
  product: ProductT
): ProductMaskT => {
  const replacements: Record<string, string> = {
    '{{название товара}}': product.name,
    '{{Название товара}}': product.name,
    '{{описание товара}}': product.description || '',
    '{{Описание товара}}': product.description || '',
    '{{цена товара}}': product.price || '0',
    '{{Цена товара}}': product.price || '0',
    '{{скидка товара}}': product.discount || '0',
    '{{Скидка товара}}': product.discount || '0',
    '{{бренд товара}}': product.brand?.name || '',
    '{{Бренд товара}}': product.brand?.name || '',
    '{{категория товара}}': product.category?.name || '',
    '{{Категория товара}}': product.category?.name || '',
    '{{артикул товара}}': product.sku || '',
    '{{Артикул товара}}': product.sku || '',
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
