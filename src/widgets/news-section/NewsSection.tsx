import React from 'react';
import s from './NewsSection.module.scss';
import { NewsCard } from '@/entities/news-card';
import { Pagination } from '@/shared/ui/pagination';
import { NewsListT } from '@/shared/api/news/types';
import clsx from 'clsx';

//todo: change to api data
const tagsNav = [
  {
    name: 'Все новости',
  },
  {
    name: 'Мебель и фурнитура',
  },
  {
    name: 'Аксессуары для дома',
  },
];

export const NewsSection = ({
  newsList,
  page,
  variant,
}: {
  newsList: NewsListT | null;
  page: string;
  variant: string;
}) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className="h1">Новости</h1>
        <div className={s.tagNavigation}>
          {tagsNav.map((tag, index) => (
            <button key={index} className={clsx(s.tagBtn, 'h6')}>
              {tag.name}
            </button>
          ))}
        </div>
        <div className={s.newsList} itemScope itemType="http://schema.org/Blog">
          {newsList?.data?.map((news, index) => (
            <NewsCard key={index} news={news} variant={variant} />
          ))}
        </div>
      </div>
      <Pagination totalPages={newsList?.last_page || 1} currentPage={page} />
    </div>
  );
};
