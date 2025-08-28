import React from 'react';
import s from './CategoryCard.module.scss';
import { CategoryT } from '@/shared/api/category/types';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import Image from 'next/image';
import clsx from 'clsx';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { cookies } from 'next/headers';

interface CategoryCardProps extends CategoryT {
  categoriesCount: number;
}

export const CategoryCard = async ({
  slug,
  photo_path,
  name,
  description,
  categoriesCount,
}: CategoryCardProps) => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  return (
    <Link href={`${paths.catalog}/${slug}`} className={s.container}>
      <div className={clsx(s.title, 'h3')}>{name}</div>
      <div className={clsx(s.description, 'body_3')}>{description}</div>
      <div
        className={clsx(
          s.imageContainer,
          categoriesCount > 4 && s.mediumImage,
          categoriesCount > 9 && s.smallImage
        )}
      >
        <Image src={`${getStoreBaseUrl(variant)}/${photo_path}`} alt={name} fill />
      </div>
    </Link>
  );
};
