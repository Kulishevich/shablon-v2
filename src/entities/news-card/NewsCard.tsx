import React from 'react';
import s from './NewsCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import clsx from 'clsx';
import { NewsT } from '@/shared/api/news/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { cookies } from 'next/headers';

interface NewsCardProps {
  news: NewsT;
  enableMicrodata?: boolean;
}

export const NewsCard = async ({ news, enableMicrodata = true }: NewsCardProps) => {
  const cookieStore = await cookies();
  const variant = cookieStore.get('variant')?.value;

  const linkProps = enableMicrodata
    ? {
        itemScope: true,
        itemType: 'http://schema.org/BlogPosting',
        itemProp: 'blogPost',
      }
    : {};

  return (
    <Link href={`${paths.news}/${news?.slug}`} className={s.cotnainer} {...linkProps}>
      <div className={s.imageContainer}>
        <Image
          src={`${getStoreBaseUrl(variant)}/${news?.photo_path}`}
          fill
          alt="news"
          {...(enableMicrodata && { itemProp: 'image' })}
        />

        <div className={s.tags}>
          {news.tags?.map((tag) => <span className={clsx('body_4', s.tag)}>{tag}</span>)}
        </div>
      </div>

      <div className={clsx('h5', s.content)} {...(enableMicrodata && { itemProp: 'headline' })}>
        {news?.title}
      </div>

      <span className={clsx(s.date, 'tag')}>
        {enableMicrodata && <meta itemProp="datePublished" content={news?.created_at || ''} />}
        {new Date(news?.created_at || '').toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}
      </span>
    </Link>
  );
};
