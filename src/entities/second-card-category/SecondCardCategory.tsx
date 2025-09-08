import React from 'react';
import s from './styles.module.scss';
import { CategoryT } from '@/shared/api/category/types';
import { paths } from '@/shared/config/constants/paths';
import Link from 'next/link';
import { ArrowRightIcon } from '@/shared/assets';
import Image from 'next/image';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import clsx from 'clsx';

interface SecondCardCategoryProps extends CategoryT {
  variant?: string;
  className?: string;
}

export const SecondCardCategory = ({
  slug,
  name,
  photo_path,
  variant,
  className,
}: SecondCardCategoryProps) => {
  return (
    <Link href={`${paths.catalog}/${slug}`} className={clsx(s.card, className)}>
      <div className={s.card__contentWrapper}>
        <div className={s.card__content}>
          <p className="h3">{name}</p>
          <p className="body_5">100 товаров</p>
        </div>

        <ArrowRightIcon />
      </div>

      <Image src={`${getStoreBaseUrl(variant)}/${photo_path}`} fill alt="category-image" />

      <div className={s.card__background} />
    </Link>
  );
};
