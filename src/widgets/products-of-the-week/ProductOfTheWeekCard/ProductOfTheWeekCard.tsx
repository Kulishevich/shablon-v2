'use client';
import { ProductT } from '@/shared/api/product/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Image from 'next/image';
import React from 'react';
import s from './styles.module.scss';
import { Button } from '@/shared/ui/button';
import { HeartIcon, ShoppingCartIcon, StarIcon } from '@/shared/assets';
import clsx from 'clsx';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsInFavorites } from '@/shared/lib/redux/selectors/FavoritesSelectors';
import { addToFavorites } from '@/shared/lib/redux/slices/favoritesSlice';
import { removeFromFavorites } from '@/shared/lib/redux/slices/favoritesSlice';

export const ProductOfTheWeekCard = ({
  variant,
  className,
  ...product
}: ProductT & { variant: string; className?: string }) => {
  const { photo_path, name, id, discount, price, rating } = product;
  const { isMobile } = useBreakpoint();
  const isDiscount = !!Number(discount);
  const dispatch = useDispatch();
  const isFavorites = useSelector(selectIsInFavorites(id));

  const totalPrice = !!discount
    ? Math.round((Number(price) * (100 - Number(discount))) / 100)
    : Number(price);

  return (
    <div key={id} className={clsx(s.card, className)}>
      <div className={s.card__imageContainer}>
        <Image
          src={`${getStoreBaseUrl(variant)}/${photo_path}`}
          fill
          alt="Products of the week"
          className={s.card__image}
        />
        <HeartIcon
          className={clsx(s.favoritesButton, { [s.active]: isFavorites })}
          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (isFavorites) {
              dispatch(removeFromFavorites(id));
            } else {
              dispatch(addToFavorites(product));
            }
          }}
        />
        {rating > 0 && (
          <div className={clsx(s.rating, 'body_7')}>
            <StarIcon className={clsx(s.star, s.active)} />
            {rating}
          </div>
        )}
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
