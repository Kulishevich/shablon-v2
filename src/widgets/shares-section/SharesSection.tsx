import { DiscountCard } from '@/entities/discount-card';
import { Pagination } from '@/shared/ui/pagination';
import React, { Suspense } from 'react';
import s from './SharesSection.module.scss';
import { PromotionsResponse } from '@/shared/api/promotions/types';
import clsx from 'clsx';

const tags = ['Все акции', 'Действующие акции', 'Архив'];

export const SharesSection = ({
  promotions,
  page,
  standalone = false,
}: {
  promotions: PromotionsResponse | null;
  page: string;
  standalone?: boolean;
}) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        {standalone ? <h1 className="h2">Акции</h1> : <h2 className="h2">Акции</h2>}
        <div className={s.tags}>
          {tags.map((tag) => (
            <button className={clsx(s.tagBtn, 'button')}>{tag}</button>
          ))}
        </div>
        <div className={s.newsList} itemScope itemType="http://schema.org/ItemList">
          {promotions?.data?.map((promotion, index) => <DiscountCard key={index} {...promotion} />)}
        </div>
      </div>
      <Suspense fallback={<p className="h4">Загрузка...</p>}>
        <Pagination totalPages={promotions?.last_page || 1} currentPage={page} />
      </Suspense>
    </div>
  );
};
