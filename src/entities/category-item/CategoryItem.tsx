import React from 'react';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { CategoryT } from '@/shared/api/category/types';
import { CollapseHeader } from '@/entities/collapse-header';
import s from './CategoryItem.module.scss';
import clsx from 'clsx';

interface CategoryItemProps {
  category: Omit<CategoryT, 'subcategories'> & {
    subcategories?: Omit<CategoryT, 'subcategories'>[];
  };
  onClose: () => void;
  parentPath?: string;
}

export const CategoryItem = ({ category, onClose, parentPath = '' }: CategoryItemProps) => {
  const currentPath = parentPath ? `${parentPath}/${category.slug}` : `${category.slug}`;
  const categoryHref = `${paths.catalog}/${currentPath}`;

  if (!category.subcategories || category.subcategories.length === 0) {
    return (
      <Link
        className={clsx('body_5', s.categoryItem)}
        href={categoryHref}
        onClick={onClose}
        itemProp="url"
      >
        {category.name}
      </Link>
    );
  }

  return (
    <CollapseHeader title={category.name} onClick={onClose} subcategory href={categoryHref}>
      {category.subcategories.map((subcategory, index) => (
        <CategoryItem
          key={index}
          category={subcategory}
          onClose={onClose}
          parentPath={currentPath}
        />
      ))}
    </CollapseHeader>
  );
};
