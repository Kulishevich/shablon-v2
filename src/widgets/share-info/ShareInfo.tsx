import Image from 'next/image';
import s from './ShareInfo.module.scss';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { ArrowSmLeftIcon } from '@/shared/assets';
import { PromotionT } from '@/shared/api/promotions/types';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import clsx from 'clsx';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const ShareInfo = ({
  title,
  published_at,
  content,
  photo_path,
  slug,
  variant,
}: PromotionT & { variant?: string }) => {
  return (
    <div className={s.container} itemScope itemType="http://schema.org/Article">
      <h1 className={clsx(s.title, 'h1_discount')} itemProp="name">
        {title}
      </h1>

      <div className={s.imageContainer}>
        <Image
          src={`${getStoreBaseUrl(variant)}/${photo_path}`}
          fill
          alt={'discount'}
          itemProp="image"
        />
      </div>

      <div className={s.content}>
        <span className="body_6" itemProp="datePublished">
          {new Date(published_at || '').toLocaleDateString('RU-ru')}
        </span>

        <div
          className={clsx('body_2', s.text)}
          dangerouslySetInnerHTML={{ __html: content || '' }}
          itemProp="articleBody"
        />

        <Button variant="link" as={Link} href={paths.shares}>
          <ArrowSmLeftIcon /> Назад к акциям
        </Button>
      </div>
    </div>
  );
};
