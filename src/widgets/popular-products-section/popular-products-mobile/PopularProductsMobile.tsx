import React, { Dispatch } from 'react';
import s from './PopularProductsMobile.module.scss';
import { ProductCard } from '@/entities/product-card';
import { ProductT, ProductTag } from '@/shared/api/product/types';
import clsx from 'clsx';

interface PopularProductsMobile {
  products: ProductT[];
  tags?: ProductTag[];
  activeTag?: number | null;
  setActiveTag?: Dispatch<React.SetStateAction<number | null>>;
}

export const PopularProductsMobile = ({
  products,
  activeTag,
  setActiveTag,
  tags,
}: PopularProductsMobile) => {
  return (
    <div className={s.container}>
      <h2 className="h2">Популярные товары</h2>
      {activeTag !== undefined && setActiveTag && tags && (
        <div className={s.tags}>
          <button className={clsx(s.tagBtn, 'button')} onClick={() => setActiveTag(null)}>
            Все
          </button>
          {tags.map((tag) => (
            <button
              className={clsx(s.tagBtn, 'button', activeTag === tag.id && s.activeTag)}
              key={tag.id}
              onClick={() => setActiveTag(tag.id)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
      <div className={s.productsContainer} itemScope itemType="http://schema.org/ItemList">
        {products?.map((product, index) => <ProductCard product={product} key={index} />)}
      </div>
    </div>
  );
};
