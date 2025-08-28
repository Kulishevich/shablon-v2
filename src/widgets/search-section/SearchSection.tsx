import React from 'react';
import s from './SearchSection.module.scss';
import { ProductCard } from '@/entities/product-card';
import { Pagination } from '@/shared/ui/pagination';
import { Filters } from '@/features/filters';
import { FiltersMobile } from '@/features/filters-mobile';
import { FilterT, ProductsResponseT } from '@/shared/api/product/types';
import { SortSelect } from '@/features/sort-select';
import { SearchPageSearch } from '@/features/search-page-search';
import { BrandT } from '@/shared/api/brands/types';
import { CategoryT } from '@/shared/api/category/types';
import { SeoBlock } from '@/entities/seo-block';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import { TagT } from '@/shared/api/tags/types';
import { TagsFilter } from '@/entities/tags-filter';

export const SearchSection = ({
  products,
  tags,
  searchQuery,
  page,
  brands,
  minPrice,
  maxPrice,
  allCategories,
  currentPath,
  filters,
}: {
  products: ProductsResponseT | null;
  tags?: TagT[];
  searchQuery: string;
  page: string;
  brands: BrandT[];
  minPrice: number;
  maxPrice: number;
  allCategories?: CategoryT[];
  currentPath: string;
  filters: FilterT[];
}) => {
  return (
    <div className={s.container}>
      <h1 className="h1">Результаты поиска по запросу "{searchQuery}"</h1>

      {tags && tags.length > 0 && (
        <div className={s.navigation}>
          <TagsFilter tags={tags} currentPath={currentPath} />
        </div>
      )}

      <div className={s.catalog}>
        <Filters
          className="desktop-only"
          brands={brands}
          min={minPrice}
          max={maxPrice}
          categories={allCategories}
          filters={filters}
        />
        <div className={s.productsContainer}>
          <div className={s.search}>
            <SearchPageSearch />
            <div className={s.selectContainer}>
              <SortSelect />
              <FiltersMobile
                brands={brands}
                min={minPrice}
                max={maxPrice}
                categories={allCategories}
                filters={filters}
              />
            </div>
          </div>

          {products?.data && products.data.data && products.data.data.length > 0 ? (
            <>
              <div className={s.productList} itemScope itemType="http://schema.org/ItemList">
                <ReduxProvider>
                  {products.data.data.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </ReduxProvider>
              </div>
              <div className={s.pagination}>
                <p className="body_7">Всего продуктов: {products.data.total || 0}</p>
                <Pagination totalPages={products.data.last_page || 1} currentPage={page} />
              </div>
            </>
          ) : (
            <div className={s.noResults}>
              <p className="h3">По вашему запросу "{searchQuery}" ничего не найдено</p>
              <p className="body_4">Попробуйте изменить запрос или воспользуйтесь фильтрами</p>
            </div>
          )}

          <SeoBlock page={`search`} align="left" />
        </div>
      </div>
    </div>
  );
};
