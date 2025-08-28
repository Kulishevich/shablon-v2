'use client';
import React, { Dispatch, useEffect, useState } from 'react';
import s from './ProductDescription.module.scss';
import clsx from 'clsx';
import { ProductT } from '@/shared/api/product/types';
import { ReviewT } from '@/shared/api/reviews/types';
import { ProductReviews } from '@/widgets/product-reviews';
import { PaymentAndDeliveryT } from '@/shared/api/delivery-and-payment/types';
import { useSearchParams } from 'next/navigation';

export const ProductDescription = ({
  product,
  reviews,
  deliveryAndPayment,
  variant,
  activeTag,
  setActiveTag,
}: {
  product: ProductT;
  reviews: ReviewT[] | null;
  deliveryAndPayment: PaymentAndDeliveryT[] | null;
  variant?: string;
  activeTag: number;
  setActiveTag: Dispatch<React.SetStateAction<number>>;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      addViewedProduct(product);
    }
  }, [product.id]);

  // Обработка параметра characteristics для автоматического переключения на вкладку
  useEffect(() => {
    if (searchParams.get('characteristics') === '1') {
      setActiveTag(2);
    }
    if (searchParams.get('reviews') === '1') {
      setActiveTag(4);
    }
  }, [searchParams]);

  const addViewedProduct = (product: ProductT) => {
    const existing = JSON.parse(localStorage.getItem('viewed_products_shablon') || '[]');
    const filtered = existing.filter((item: ProductT) => item.id !== product.id);
    const updated = [product, ...filtered].slice(0, 20);
    localStorage.setItem('viewed_products_shablon', JSON.stringify(updated));
  };

  const info = [
    {
      id: 1,
      title: 'Описание товара',
      content: product.description,
    },
    {
      id: 2,
      title: 'Все характеристики',
    },
    {
      id: 3,
      title: 'Доставка',
    },
    {
      id: 4,
      title: 'Отзывы',
    },
  ];

  const changeActiveTag = (tag: number) => {
    setActiveTag(tag);
  };

  return (
    <div className={s.container}>
      <div className={s.navigation} id="characteristics">
        {info.map((item, index) => (
          <button
            key={index}
            onClick={() => changeActiveTag(item.id)}
            className={clsx(activeTag === item.id && s.active, 'h6')}
          >
            {item.title}
          </button>
        ))}
      </div>

      {activeTag === 1 && (
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: product.description || '' }}
        />
      )}

      {activeTag === 2 && (
        <div className={s.content}>
          <ul className={s.specifications}>
            {product?.specifications?.map((elem) => (
              <li className="body_3" key={elem.id}>
                <div>{elem?.name}</div>
                <span>{elem?.pivot?.value}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTag === 3 && (
        <div>
          {deliveryAndPayment
            ?.filter((elem) => elem.title.toLowerCase().includes('доставка'))
            .map((item) => (
              <div dangerouslySetInnerHTML={{ __html: item.content }} className={s.content} />
            ))}
        </div>
      )}

      {activeTag === 4 && (
        <div className={s.content}>
          <ProductReviews reviews={reviews} productId={product.id.toString()} variant={variant} />
        </div>
      )}
    </div>
  );
};
