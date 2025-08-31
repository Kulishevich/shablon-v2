'use client';
import React from 'react';
import s from './FavoritesButton.module.scss';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { HeartIcon } from '@/shared/assets';
import { useSelector } from 'react-redux';
import { selectCartCountProducts } from '@/shared/lib/redux/selectors/CartSelectors';
import clsx from 'clsx';

interface FavoritesButtonProps {
  variant: 'home' | 'default';
}

export const FavoritesButton = ({ variant }: FavoritesButtonProps) => {
  const productsQuantity = useSelector(selectCartCountProducts);

  return (
    <Link className={clsx(s.favoritesButton, s[variant])} href={paths.cart}>
      <div className={s.favoritesButton__iconWrapper}>
        <HeartIcon className={s.favoritesButton__icon} />
        <p className={clsx('body_7', s.favoritesButton__count)}>{productsQuantity}</p>
      </div>
      <p className={'body_7'}>Избранное</p>
    </Link>
  );
};
