'use client';
import React, { Dispatch, useState } from 'react';
import s from './ProductInfo.module.scss';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightUpIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from '@/shared/assets';
import { ProductsImages } from '@/features/product-images';
import { ProductT } from '@/shared/api/product/types';
import clsx from 'clsx';
import { TextField } from '@/shared/ui/text-field';
import { Button } from '@/shared/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { addInCart } from '@/shared/lib/redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '@/shared/lib/redux/slices/favoritesSlice';
import { showToast } from '@/shared/ui/toast';
import { ProductAdvantageType } from '@/shared/api/advantages/types';
import Link from 'next/link';
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint';
import Image from 'next/image';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { selectIsInFavorites } from '@/shared/lib/redux/selectors/FavoritesSelectors';

export const ProductInfo = ({
  product,
  advantages,
  setActiveTag,
  variant,
}: {
  product: ProductT;
  advantages: ProductAdvantageType[] | null;
  setActiveTag: Dispatch<React.SetStateAction<number>>;
  variant?: string;
}) => {
  const { isTablet } = useBreakpoint();
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const isDiscount = !!Number(product?.discount);
  const isFavorites = useSelector(selectIsInFavorites(product.id));

  const handleAddToFavorites = () => {
    if (isFavorites) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const totalPrice = !!product?.discount
    ? Math.round((Number(product?.price) * (100 - Number(product?.discount))) / 100)
    : Number(product?.price);

  const changeCountValue = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = Number(numericValue);
    if (number >= 1 || numericValue === '') {
      setCount(number || 1);
    }
  };

  const handleAddInCard = () => {
    dispatch(addInCart({ ...product, quantity: count }));
    showToast({ title: 'Добавлено в корзину', variant: 'success' });
  };

  const increment = () => {
    setCount((prev) => ++prev);
  };

  const decrement = () => {
    setCount((prev) => Math.max(--prev, 1));
  };

  return (
    <div className={s.container} itemScope>
      <ProductsImages product={product} />

      <div className={s.characteristics}>
        <div className={s.topInfo}>
          <div className={s.tagsContainer}>
            {product?.tags.map((tag) => (
              <span
                style={{ background: tag.color }}
                key={tag.id}
                className={clsx('tag', s.popular)}
              >
                {tag.name}
              </span>
            ))}
          </div>

          <div className={clsx(s.sku, 'body_7')}>
            Арт.: <span>{product?.sku}</span>
          </div>
        </div>

        <h1 className={clsx(s.title, 'h1_discount desktop-only')}>{product?.name}</h1>

        <div className={s.basicInfo}>
          <div className={s.basicCaption}>
            <div className={s.rating}>
              <div className={s.startRating}>
                <StarIcon className={clsx(s.active)} />
                <span className={'body_5'}>{product?.rating}</span>
              </div>
              <Link href="?reviews=1#characteristics" className={clsx(s.reviews, 'body_7')}>
                {product?.reviews_count} отзыва
              </Link>
            </div>

            <div className={clsx(s.availability, 'body_5')}>в наличии</div>
          </div>
          {product.brand && (
            <div className={s.brand}>
              <Image
                src={`${getStoreBaseUrl(variant)}/${product.brand.image_path}`}
                alt={product.brand.name}
                width={80}
                height={40}
              />
            </div>
          )}
        </div>

        <div className={s.totalPrice}>
          <p className={clsx('h2', isDiscount && s.discount)} itemProp="price">
            {totalPrice} BYN
          </p>
          {isDiscount && (
            <span className="discount" itemProp="price">
              {Number(product?.price)} byn
            </span>
          )}
        </div>

        <div className={s.addInCartContainer}>
          <div className={s.countContainer}>
            <Button variant="icon" onClick={decrement}>
              <ArrowLeftIcon />
            </Button>
            <TextField
              className={s.input}
              value={count}
              onChange={(e) => changeCountValue(e.target.value)}
            />
            <Button variant="icon" onClick={increment}>
              <ArrowRightIcon />
            </Button>
          </div>
          <Button onClick={handleAddInCard} className={clsx(s.addInCartButton)}>
            В корзину
          </Button>
          <Button
            variant={'icon'}
            className={clsx(s.favoritesButton, { [s.active]: isFavorites })}
            onClick={handleAddToFavorites}
            aria-label="В избранное"
          >
            <HeartIcon />
          </Button>
        </div>

        <div className={s.details}>
          {advantages?.map((advantage) => (
            <p className="body_7" key={advantage.id}>
              <i className={clsx(advantage.icon, s.icon)} /> {advantage.title}
            </p>
          ))}
        </div>

        <div className="h5">Описание:</div>
        <div className={s.specificationsContainer}>
          <div
            className={s.description}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />

          <Button
            variant="link"
            className={s.button}
            onClick={() => {
              setActiveTag(1);

              const el = document.getElementById('description');
              if (el) {
                const yOffset = isTablet ? -110 : -210; // отступ сверху
                const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            Всё описание
          </Button>
        </div>
      </div>
    </div>
  );
};
