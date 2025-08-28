import React from 'react';
import s from './DiscountCard.module.scss';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { ArrowRightUpIcon } from '@/shared/assets';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import clsx from 'clsx';
import { PromotionT } from '@/shared/api/promotions/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { cookies } from 'next/headers';

export const DiscountCard = async ({
  title,
  photo_path,
  start_date,
  end_date,
  slug,
}: PromotionT) => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  return (
    <Link
      href={`${paths.shares}/${slug}`}
      className={s.container}
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className={s.imageContainer}>
        <Image
          src={`${getStoreBaseUrl(variant)}/${photo_path}`}
          fill
          alt="discount"
          itemProp="image"
        />
      </div>
      <div className={s.content}>
        <span className={clsx(s.tag, 'tag')} itemProp="datePublished">
          С{' '}
          {new Date(start_date || '').toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}{' '}
          по{' '}
          {new Date(end_date || '').toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </span>
        <div className={clsx(s.title, 'h5')} itemProp="name">
          {title}
        </div>
        <Button variant="link" className={s.button} itemProp="mainEntityOfPage">
          Подробнее
          <ArrowRightUpIcon />
        </Button>
      </div>
    </Link>
  );
};
