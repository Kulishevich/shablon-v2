'use client';
import { ProductT } from '@/shared/api/product/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Image from 'next/image';
import React from 'react';
import s from './styles.module.scss';
import { Button } from '@/shared/ui/button';
import { ShoppingCartIcon } from '@/shared/assets';
import clsx from 'clsx';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';

export const ProductOfTheWeekCard = ({
  discount,
  price,
  photo_path,
  name,
  id,
  variant,
}: ProductT & { variant?: string }) => {
  const { isMobile } = useBreakpoint();
  const isDiscount = !!Number(discount);

  const totalPrice = !!discount
    ? Math.round((Number(price) * (100 - Number(discount))) / 100)
    : Number(price);

  return (
    <div key={id} className={s.card}>
      <div className={s.card__imageContainer}>
        <Image
          src={`${getStoreBaseUrl(variant)}/${photo_path}`}
          fill
          alt="Products of the week"
          className={s.card__image}
        />
      </div>
      <p className={clsx(s.card__name, 'body_6')}>{name}</p>
      <div className={s.card__footer}>
        <div className={s.card__priceContainer}>
          {isDiscount && <p className={clsx(s.card__priceWithDiscount, 'tag')}>{price} BYN</p>}
          <p className={'h6'}>{totalPrice} BYN/шт</p>
        </div>

        <Button className={s.card__cartButton}>
          {isMobile ? 'В корзину' : <ShoppingCartIcon />}
        </Button>
      </div>
    </div>
  );
};
