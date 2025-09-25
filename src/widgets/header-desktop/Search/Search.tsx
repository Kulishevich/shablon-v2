'use client';
import React, { useRef } from 'react';
import s from './Search.module.scss';
import { Logo } from '@/shared/ui/logo';
import { BurgerButton } from '@/entities/burger-button';
import { SearchInput } from '@/entities/search-input';
import { CartButton } from '@/entities/cart-button';
import { CategoryT } from '@/shared/api/category/types';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import { FavoritesButton } from '@/entities/favorites-button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import clsx from 'clsx';

interface SearchProps {
  variant: 'home' | 'default';
  siteVariant: string;
  categories: CategoryT[] | null;
}

export const Search = ({ categories, variant, siteVariant }: SearchProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <div className={clsx(s.wrapper, s[variant])}>
        <div className={s.container} ref={containerRef}>
          <Logo variant="primary" />
          <BurgerButton categories={categories} variant={siteVariant} containerRef={containerRef} />
          <SearchInput categories={categories} headerVariant={variant} />
          <ReduxProvider>
            <FavoritesButton variant={variant} />
            <CartButton variant={variant} />
          </ReduxProvider>
        </div>
      </div>
      <div className={s.navigation}>
        {categories?.map((cat) => (
          <Link
            href={`${paths.catalog}/${cat.slug}`}
            className={clsx(s.navLink, 'body_3', s[variant])}
            key={cat.id}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </>
  );
};
