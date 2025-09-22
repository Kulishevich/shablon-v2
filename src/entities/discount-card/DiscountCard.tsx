import React from 'react';
import s from './DiscountCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { PromotionT } from '@/shared/api/promotions/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const DiscountCard = ({
  title,
  photo_path,
  slug,
  variant,
}: PromotionT & { variant?: string }) => {
  return (
    <Link
      href={`${paths.shares}/${slug}`}
      className={s.container}
      itemScope
      itemType="http://schema.org/BlogPosting"
    >
      <div className={s.content}>
        <h4 className="h4">{title}</h4>
      </div>

      <Image
        src={`${getStoreBaseUrl(variant)}/${photo_path}`}
        fill
        alt="discount"
        itemProp="image"
      />

      <div className={s.background} />
    </Link>
  );
};
