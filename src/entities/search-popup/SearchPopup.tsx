import React from 'react';
import s from './SearchPopup.module.scss';
import { SearchProductCard } from '../search-product-card';
import Link from 'next/link';
import { ProductT } from '@/shared/api/product/types';
import { CategoryWithPath } from '@/shared/lib/utils/categoryUtils';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

const CategoryItem = ({ category }: { category: CategoryWithPath }) => {
  return (
    <Link href={category.fullUrl} className="body_4" style={{ display: 'block' }}>
      {category.name}
    </Link>
  );
};

export const SearchPopup = ({
  categories,
  products,
  isLoading = false,
}: {
  categories: CategoryWithPath[];
  products: ProductT[];
  isLoading?: boolean;
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {categories.length > 0 && (
          <div className={s.categories}>
            <h6 className="h6">Поиск по категориям:</h6>
            {categories.map((category, index) => (
              <CategoryItem key={index} category={category} />
            ))}
          </div>
        )}
        {products.length > 0 && (
          <ReduxProvider>
            <div className={s.products}>
              <h6 className="h6">Поиск по товарам:</h6>
              {products.map((product) => (
                <SearchProductCard {...product} key={product.id} />
              ))}
            </div>
          </ReduxProvider>
        )}
        {isLoading && (
          <div className={s.loading}>
            <p className="body_4">Поиск...</p>
          </div>
        )}
        {!isLoading && categories.length === 0 && products.length === 0 && (
          <div className={s.noResults}>
            <p className="body_4">По вашему запросу ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};
