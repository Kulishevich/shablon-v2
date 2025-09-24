import React from 'react';
import s from './CatalogSection.module.scss';
import { ProductCard } from '@/entities/product-card';
import { Pagination } from '@/shared/ui/pagination';
import { Filters } from '@/features/filters';
import { FiltersMobile } from '@/features/filters-mobile';
import { FilterT, ProductsResponseT } from '@/shared/api/product/types';
import { CategoryT } from '@/shared/api/category/types';
import { SortSelect } from '@/features/sort-select';
import { CatalogSearch } from '@/features/catalog-search';
import { BrandT } from '@/shared/api/brands/types';
import { TagT } from '@/shared/api/tags/types';
import { TagsFilter } from '@/entities/tags-filter';
import { SeoBlock } from '@/entities/seo-block';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import Script from 'next/script';
import Link from 'next/link';
import { SecondCardCategory } from '@/entities/second-card-category';
import clsx from 'clsx';
import { CatalogTags } from '@/features/catalog-tags';
import { getSetting } from '@/shared/api/design/getSetting';
import { MainBannerSlider } from '../main-banner-slider';
import { SubcategoriesSlider } from '../subcategories-slider';
import Image from 'next/image';

export const CatalogSection = async ({
  products,
  category,
  page,
  brands,
  minPrice,
  maxPrice,
  categoryPath,
  allCategories,
  tags,
  currentPath,
  filters,
  variant,
}: {
  products: ProductsResponseT | null;
  category: CategoryT | null;
  page: string;
  brands: BrandT[];
  minPrice: number;
  maxPrice: number;
  categoryPath?: CategoryT[];
  allCategories?: CategoryT[];
  tags?: TagT[];
  currentPath: string;
  filters: FilterT[];
  variant: string;
}) => {
  const settings = await getSetting({ variant });

  return (
    <div className={s.container}>
      {category && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: category.name,
              offers: {
                '@type': 'AggregateOffer',
                offerCount: products?.data?.total || 0,
                highPrice: maxPrice,
                lowPrice: products?.price_range?.min || 0,
                priceCurrency: 'BYN',
              },
            }),
          }}
        />
      )}
      <h1 className="h1">{category?.name}</h1>

      <div className={clsx(s.description, 'body_2')}>{category?.description}</div>

      <SubcategoriesSlider
        className={s.subcategoriesList}
        subcategories={category?.subcategories || []}
        variant={variant}
        categoryPath={categoryPath || []}
      />

      <div className={s.catalog}>
        <Filters
          className="desktop-only"
          brands={brands}
          min={minPrice}
          max={maxPrice}
          categories={allCategories}
          currentCategory={category || undefined}
          categoryPath={categoryPath}
          filters={filters}
        />
        <div className={s.productsContainer}>
          <div className={s.search}>
            <CatalogTags tags={tags || []} />
            <div className={s.selectContainer}>
              <SortSelect />
              <FiltersMobile
                brands={brands}
                min={minPrice}
                max={maxPrice}
                categories={allCategories}
                currentCategory={category || undefined}
                categoryPath={categoryPath}
                filters={filters}
              />
            </div>
          </div>
          <div className={s.productList} itemScope itemType="http://schema.org/ItemList">
            <ReduxProvider>
              {products?.data?.data?.map((product, index, array) => {
                if (array.length > 6 && index === 6) {
                  return (
                    <>
                      {settings?.main_banner && (
                        <MainBannerSlider
                          banners={[settings.main_banner, settings.main_banner]}
                          variant={variant}
                        />
                      )}
                      <ProductCard key={index} product={product} />
                    </>
                  );
                }

                return <ProductCard key={index} product={product} />;
              })}
            </ReduxProvider>
          </div>
          <div className={s.pagination}>
            <p className="body_7">Всего продуктов: {products?.data?.total || 0}</p>
            <Pagination totalPages={products?.data?.last_page || 1} currentPage={page} />
          </div>
          <SeoBlock page={`catalog`} align="left" />

          <Image
            src="/delivery-image.png"
            alt="banner"
            width={298}
            height={354}
            className={clsx(s.banner, 'mobile-only')}
          />
        </div>
      </div>
    </div>
  );
};
