import React, { useState } from 'react';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { CategoryT } from '@/shared/api/category/types';
import s from './NavigationPopup.module.scss';

export const NavigationPopup = ({ categories }: { categories: CategoryT[] | null }) => {
  const [activeCategory, setActiveCategory] = useState(categories?.[0]?.id);
  const activeContent = categories?.find((elem) => elem.id === activeCategory);

  return (
    <div className={s.content}>
      <div className={s.categoryList}>
        {categories?.map((category, index) => (
          <Link
            className="h6"
            href={`${paths.catalog}/${category.slug}`}
            key={index}
            onMouseEnter={() => setActiveCategory(category?.id)}
          >
            {category.name}
          </Link>
        ))}
      </div>
      <div className={s.subcategoryList}>
        <h3 className="h3">{activeContent?.name}</h3>
        <div className={s.subcategories}>
          {activeContent?.subcategories?.map((subcategory, index) => (
            <Link
              className="body_4"
              href={`${paths.catalog}/${activeContent.slug}/${subcategory.slug}`}
              key={index}
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
