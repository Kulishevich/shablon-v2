import React from 'react';
import s from './NewsSection.module.scss';
import { NewsCard } from '@/entities/news-card';
import { Pagination } from '@/shared/ui/pagination';
import { NewsListT } from '@/shared/api/news/types';

export const NewsSection = ({ newsList, page }: { newsList: NewsListT | null; page: string }) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1 className="h1">Новости</h1>
        <div className={s.newsList} itemScope itemType="http://schema.org/Blog">
          {newsList?.data?.map((news, index) => <NewsCard key={index} news={news} />)}
        </div>
      </div>
      <Pagination totalPages={newsList?.last_page || 1} currentPage={page} />
    </div>
  );
};
