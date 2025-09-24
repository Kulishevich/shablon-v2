'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';

import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { CollapseFilter } from '@/shared/ui/collapse-filter';
import clsx from 'clsx';
import s from './Filters.module.scss';
import { BrandT } from '@/shared/api/brands/types';
import { PriceSlider } from '@/shared/ui/price-slider';
import { TextField } from '@/shared/ui/text-field';
import { CategoryTree } from '@/entities/category-tree';
import { CategoryT } from '@/shared/api/category/types';
import { FilterT } from '@/shared/api/product/types';
import Image from 'next/image';

export const Filters = ({
  className,
  brands,
  min,
  max,
  categories,
  currentCategory,
  categoryPath,
  filters,
}: {
  className?: string;
  brands: BrandT[];
  min: number;
  max: number;
  categories?: CategoryT[];
  currentCategory?: CategoryT;
  categoryPath?: CategoryT[];
  filters: FilterT[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [minPrice, setMinPrice] = useState<number>(Number(searchParams.get('price_from')) || min);
  const [maxPrice, setMaxPrice] = useState<number>(Number(searchParams.get('price_to')) || max);
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
  const [dynamicFilters, setDynamicFilters] = useState<Record<string, string[]>>({});
  const isFirstRender = useRef(true);

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const initialBrands = brandParam ? brandParam.split(',') : [];
    setCheckedBrands(initialBrands);

    // Инициализация динамических фильтров из URL
    const initialDynamicFilters: Record<string, string[]> = {};
    filters.forEach((filter) => {
      const paramValue = searchParams.get(filter.slug);
      if (paramValue) {
        initialDynamicFilters[filter.slug] = paramValue.split('|');
      } else {
        initialDynamicFilters[filter.slug] = [];
      }
    });
    setDynamicFilters(initialDynamicFilters);
  }, [filters]);

  const updatePriceUrl = useMemo(
    () =>
      debounce((min: number, max: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('price_from', min.toString());
        params.set('price_to', max.toString());
        params.set('page', '1');

        router.push(`?${params.toString()}`);
      }, 500),
    [searchParams]
  );

  const updateUrl = useMemo(
    () =>
      debounce((values: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('brand', values.join(','));
        params.set('page', '1');
        router.push(`?${params.toString()}`);
      }, 500),
    [searchParams]
  );

  const updateDynamicFilterUrl = useMemo(
    () =>
      debounce((filterSlug: string, values: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (values.length > 0) {
          params.set(filterSlug, values.join('|'));
        } else {
          params.delete(filterSlug);
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
      }, 500),
    [searchParams]
  );

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    updatePriceUrl(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    return () => {
      updatePriceUrl.cancel();
      updateUrl.cancel();
      updateDynamicFilterUrl.cancel();
    };
  }, [updatePriceUrl, updateUrl, updateDynamicFilterUrl]);

  const handleChangeBrands = (value: string, checked: boolean) => {
    const lower = value.toLowerCase();
    const updated = checked ? [...checkedBrands, lower] : checkedBrands.filter((v) => v !== lower);

    setCheckedBrands(updated);
    updateUrl(updated);
  };

  const handleChangePrice = (value: string, type: 'max' | 'min') => {
    const numeric = Number(value);
    if (!isNaN(numeric)) {
      if (type === 'max') {
        setMaxPrice(numeric);
      } else {
        setMinPrice(numeric);
      }
    }
  };

  const handleChangeDynamicFilter = (filterSlug: string, value: string, checked: boolean) => {
    const currentValues = dynamicFilters[filterSlug] || [];
    const updated = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value);

    setDynamicFilters((prev) => ({
      ...prev,
      [filterSlug]: updated,
    }));
    updateDynamicFilterUrl(filterSlug, updated);
  };

  const resetFilters = () => {
    setCheckedBrands([]);
    setMinPrice(min);
    setMaxPrice(max);

    // Сброс динамических фильтров
    const resetDynamicFilters: Record<string, string[]> = {};
    filters.forEach((filter) => {
      resetDynamicFilters[filter.slug] = [];
    });
    setDynamicFilters(resetDynamicFilters);

    // Сохраняем поисковой запрос и другие параметры (кроме фильтров) при сбросе
    const params = new URLSearchParams();
    const searchQuery = searchParams.get('q');
    const sortBy = searchParams.get('sort_by');
    const sortDirection = searchParams.get('sort_direction');
    const search = searchParams.get('search');
    const tags = searchParams.get('tags'); // Сохраняем теги

    if (searchQuery) {
      params.set('q', searchQuery);
    }
    if (search) {
      params.set('search', search);
    }
    if (sortBy) {
      params.set('sort_by', sortBy);
    }
    if (sortDirection) {
      params.set('sort_direction', sortDirection);
    }
    if (tags) {
      params.set('tags', tags); // Сохраняем теги при сбросе
    }
    params.set('page', '1');

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={clsx(s.filters, className)}>
      {categories && categories.length > 0 && (
        <CategoryTree
          categories={categories}
          title="Категории"
          className={s.categoryFilter}
          currentCategory={currentCategory}
          categoryPath={categoryPath}
        />
      )}

      <div className={clsx(s.filterTitle, 'h4')}>Фильтр</div>

      {brands.length > 0 && (
        <CollapseFilter title="Бренд">
          {brands.map((brand, index) => (
            <Checkbox
              label={brand.name}
              checked={checkedBrands.includes(brand.name.toLowerCase())}
              onCheckedChange={(checked) => handleChangeBrands(brand.name, !!checked)}
              key={index}
            />
          ))}
        </CollapseFilter>
      )}

      <CollapseFilter title="Цена">
        <div className={s.inputsContainer}>
          <TextField
            className={s.input}
            value={minPrice}
            onChange={(e) => handleChangePrice(e.target.value, 'min')}
          />
          <TextField
            className={s.input}
            value={maxPrice}
            onChange={(e) => handleChangePrice(e.target.value, 'max')}
          />
        </div>
        <PriceSlider
          min={min}
          max={max}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </CollapseFilter>

      {filters.map((filter) => (
        <CollapseFilter key={filter.id} title={filter.name}>
          {filter.values.map((value, index) => (
            <Checkbox
              key={index}
              label={value}
              checked={dynamicFilters[filter.slug]?.includes(value) || false}
              onCheckedChange={(checked) =>
                handleChangeDynamicFilter(filter.slug, value, !!checked)
              }
            />
          ))}
        </CollapseFilter>
      ))}

      <Button variant="secondary" fullWidth onClick={resetFilters}>
        Очистить фильтр
      </Button>

      <Image src="/delivery-image.png" alt="banner" width={298} height={354} className={s.banner} />
    </div>
  );
};
