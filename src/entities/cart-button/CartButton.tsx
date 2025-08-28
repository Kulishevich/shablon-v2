'use client';
import React from 'react';
import s from './CartButton.module.scss';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { ShoppingCartIcon } from '@/shared/assets';
import { useSelector } from 'react-redux';
import { selectCartCountProducts } from '@/shared/lib/redux/selectors/CartSelectors';
import clsx from 'clsx';

export const CartButton = () => {
  const productsQuantity = useSelector(selectCartCountProducts);

  return (
    <Link className={clsx(s.cartButton)} href={paths.cart}>
      <div className={s.cartButton__iconWrapper}>
        <ShoppingCartIcon className={s.cartButton__icon} />
        <p className={clsx('body_7', s.cartButton__count)}>{productsQuantity}</p>
      </div>
      <p className={'body_7'}>Корзина</p>
    </Link>
  );
};
