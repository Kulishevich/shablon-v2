import { CategoryT } from '@/shared/api/category/types';
import React from 'react';
import s from './styles.module.scss';
import { SecondCardCategory } from '@/entities/second-card-category';

interface CatalogListProps {
  categories: CategoryT[];
  variant?: string;
}

export const CatalogList = ({ categories, variant }: CatalogListProps) => {
  return (
    <div className={s.container}>
      <h1 className="h1">Каталог</h1>

      <div className={s.categoriesList}>
        {categories.map((cat) => (
          <SecondCardCategory {...cat} variant={variant} key={cat.id} />
        ))}
      </div>
    </div>
  );
};
