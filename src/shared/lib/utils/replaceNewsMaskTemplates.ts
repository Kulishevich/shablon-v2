import { NewsMaskT } from '@/shared/api/meta-tags/types';
import { NewsT } from '@/shared/api/news/types';

/**
 * Заменяет шаблонные строки в полях NewsMaskT на соответствующие значения из новости
 * 
 * @param mask - объект NewsMaskT с шаблонными строками
 * @param news - данные новости для замены
 * @returns объект NewsMaskT с замененными значениями
 */
export const replaceNewsMaskTemplates = (
  mask: NewsMaskT,
  news: NewsT
): NewsMaskT => {
  // Форматируем дату публикации
  const formatPublicationDate = (dateString: string | null): string => {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  // Форматируем теги
  const formatTags = (tags: string[] | null): string => {
    if (!tags || tags.length === 0) return '';
    return tags.join(', ');
  };

  const replacements: Record<string, string> = {
    '{{заголовок новости}}': news.title || '',
    '{{Заголовок новости}}': news.title || '',
    '{{подзаголовок новости}}': news.subtitle || '',
    '{{Подзаголовок новости}}': news.subtitle || '',
    '{{дата публикации}}': formatPublicationDate(news.publication_date),
    '{{Дата публикации}}': formatPublicationDate(news.publication_date),
    '{{теги новости}}': formatTags(news.tags),
    '{{Теги новости}}': formatTags(news.tags),
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
