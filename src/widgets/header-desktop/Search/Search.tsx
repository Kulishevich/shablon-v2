import React from 'react';
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

export const Search = ({ categories }: { categories: CategoryT[] | null }) => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.container}>
          <Logo variant="primary" />
          <BurgerButton categories={categories} />
          <SearchInput categories={categories} />
          <ReduxProvider>
            <FavoritesButton />
            <CartButton />
          </ReduxProvider>
        </div>
      </div>
      <div className={s.navigation}>
        {categories?.map((cat) => (
          <Link
            href={`${paths.catalog}/${cat.slug}`}
            className={clsx(s.navLink, 'body_3')}
            key={cat.id}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </>
  );
};
