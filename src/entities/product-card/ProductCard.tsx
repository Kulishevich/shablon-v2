'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { showToast } from '@/shared/ui/toast';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CloseIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from '@/shared/assets';
import clsx from 'clsx';
import s from './ProductCard.module.scss';
import { ProductT } from '@/shared/api/product/types';
import { useDispatch, useSelector } from 'react-redux';
import { addInCart, changeProductCount, deleteFromCart } from '@/shared/lib/redux/slices/cartSlice';
import { TextField } from '@/shared/ui/text-field';
import debounce from 'lodash.debounce';
import { buildProductUrlSync } from '@/shared/lib/utils/productUtils';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Cookies from 'js-cookie';
import { selectIsInFavorites } from '@/shared/lib/redux/selectors/FavoritesSelectors';
import { addToFavorites, removeFromFavorites } from '@/shared/lib/redux/slices/favoritesSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export const ProductCard = ({
  product,
  productInCart = false,
}: {
  productInCart?: boolean;
  product: ProductT & { quantity?: number };
}) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  const { discount, price, id, name, main_image, images, quantity, sku } = product;
  const [count, setCount] = useState<number>(quantity || 1);
  const dispatch = useDispatch();
  const totalPrice = discount
    ? Math.round((Number(price) * (100 - Number(discount))) / 100)
    : price;
  const is_discount = !!Number(discount);
  const isInFavorites = useSelector(selectIsInFavorites(id));

  const handleAddInCard = () => {
    dispatch(addInCart({ ...product, quantity: count }));
    showToast({ title: 'Добавлено в корзину', variant: 'success' });
  };

  useEffect(() => {
    setCount(quantity || 1);
  }, [quantity]);

  const debouncedDispatch = useMemo(
    () =>
      debounce((value: number) => {
        dispatch(changeProductCount({ id, count: value }));
      }, 400),
    [dispatch, id]
  );

  const changeCountValue = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    const number = Number(numericValue);
    if (number >= 1 || numericValue === '') {
      setCount(number || 1);
      debouncedDispatch(number || 1);
    }
  };

  useEffect(() => {
    return () => {
      debouncedDispatch.cancel();
    };
  }, [debouncedDispatch]);

  const increment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCount((prev) => ++prev);
  };

  const decrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCount((prev) => Math.max(--prev, 1));
  };

  // Вычисляем общее количество слайдов
  const totalSlides = useMemo(() => {
    let count = 0;
    if (main_image) count++;
    if (images) count += images.length;
    return count;
  }, [main_image, images]);

  // Обработчик движения мыши над слайдером
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!swiperRef.current || totalSlides <= 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    // Делим слайдер на равные секторы по количеству слайдов
    const sectorWidth = width / totalSlides;
    const sectorIndex = Math.floor(x / sectorWidth);

    // Ограничиваем индекс в пределах доступных слайдов
    const clampedIndex = Math.max(0, Math.min(sectorIndex, totalSlides - 1));

    // Переключаем на соответствующий слайд
    swiperRef.current.slideTo(clampedIndex, 200);
  };

  return (
    <Link className={s.container} href={buildProductUrlSync({ product, variant })}>
      <div className={s.imageContainer}>
        <div
          onMouseMove={handleMouseMove}
          style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 5 }}
        />
        <Swiper
          className={s.swiper}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {(!images || images.length === 0) && main_image && (
            <SwiperSlide>
              <Image
                src={`${getStoreBaseUrl(variant)}/${main_image?.image_path}`}
                fill
                alt="product"
                className={s.image}
              />
            </SwiperSlide>
          )}
          {images?.map((image) => (
            <SwiperSlide key={image.id}>
              <Image
                src={`${getStoreBaseUrl(variant)}/${image.image_path}`}
                fill
                alt="product"
                className={s.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <HeartIcon
          className={clsx(s.favoritesButton, { [s.active]: isInFavorites })}
          onClick={(e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (isInFavorites) {
              dispatch(removeFromFavorites(id));
            } else {
              dispatch(addToFavorites(product));
            }
          }}
        />

        <div className={s.tagsContainer}>
          {product?.tags?.map((tag) => (
            <span style={{ background: tag.color }} key={tag.id} className={clsx('tag', s.popular)}>
              {tag.name}
            </span>
          ))}
        </div>
        {productInCart && (
          <Button
            variant="icon_secondary"
            className={s.deleteButton}
            onClick={() => dispatch(deleteFromCart(id))}
          >
            <CloseIcon />
          </Button>
        )}
      </div>
      <div
        className={s.priceContainer}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
      >
        <div className={s.price}>
          <div className="h4">
            <span>{totalPrice}</span> BYN/шт
          </div>
          {is_discount && (
            <span className="discount">
              <span>{product?.price}</span> BYN
            </span>
          )}
        </div>
      </div>

      <div className={clsx(s.title, 'body_4')}>{name}</div>
      <div
        className={clsx(s.sku, 'body_7')}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.preventDefault()}
      >
        Артикул: <span>{sku}</span>
      </div>

      <div className={s.info}>
        {product?.rating > 0 && (
          <div className={clsx(s.rating, 'body_7')}>
            <StarIcon className={clsx(s.star, s.active)} />
            {product?.rating}
          </div>
        )}
        <div className={s.availability}>
          <span className={clsx(s.availabilityText, 'body_6')}>в наличии</span>
        </div>
      </div>

      <div className={s.footerCard}>
        {!productInCart && (
          <Button
            fullWidth
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              handleAddInCard();
            }}
          >
            В корзину
          </Button>
        )}
      </div>

      {productInCart && (
        <div className={s.countContainer}>
          <Button variant="icon" onClick={decrement} className={s.countButton}>
            <ArrowLeftIcon />
          </Button>
          <TextField
            className={s.counter}
            value={count}
            onChange={(e) => changeCountValue(e.target.value)}
          />
          <Button variant="icon" onClick={increment} className={s.countButton}>
            <ArrowRightIcon />
          </Button>
        </div>
      )}

      {/*  <div className={s.specifications}>
        {product?.specifications?.slice(0, 3).map((specification) => (
          <div key={specification.id} className={clsx(s.specification, 'body_7')}>
            {specification.name}: <span>{specification.pivot?.value}</span>
          </div>
        ))}
      </div> */}
    </Link>
  );
};
