'use client';
import { CloseIcon, FilterIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import s from './FiltersMobile.module.scss';
import { Filters } from '../filters/Filters';
import clsx from 'clsx';
import { BrandT } from '@/shared/api/brands/types';
import { CategoryT } from '@/shared/api/category/types';
import { FilterT } from '@/shared/api/product/types';

export const FiltersMobile = ({
  brands,
  min,
  max,
  categories,
  currentCategory,
  categoryPath,
  filters,
}: {
  brands: BrandT[];
  min: number;
  max: number;
  categories?: CategoryT[];
  currentCategory?: CategoryT;
  categoryPath?: CategoryT[];
  filters: FilterT[];
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild className={clsx(s.trigger, 'mobile-only')}>
        <Button variant="icon_secondary">
          <FilterIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className={clsx(s.content, 'mobile-only')}>
        <div className={s.wrapper}>
          <Dialog.Title asChild>
            <h2 className="h2">Фильтр</h2>
          </Dialog.Title>
          <Filters
            brands={brands}
            min={min}
            max={max}
            categories={categories}
            currentCategory={currentCategory}
            categoryPath={categoryPath}
            filters={filters}
          />
          <Dialog.Close asChild>
            <Button variant="icon_secondary" className={s.closeButton}>
              <CloseIcon />
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
