import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { ArrowSmLeftIcon } from '@/shared/assets';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import s from './NewsInfoSection.module.scss';
import { NewsT } from '@/shared/api/news/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const NewsInfoSection = ({ news, variant }: { news: NewsT | null; variant?: string }) => {
  return (
    <div className={s.container} itemScope itemType="http://schema.org/Article">
      <div className={s.titleContainer}>
        <div className={s.title}>
          <meta itemProp="datePublished" content={news?.created_at || ''} />
          <span className="h5">
            {new Date(news?.created_at || '').toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </span>
          <h1 className="h1" itemProp="headline">
            {news?.title}
          </h1>
        </div>
        <div className={s.imageContainer}>
          <Image
            src={`${getStoreBaseUrl(variant)}/${news?.photo_path}`}
            fill
            alt="new"
            itemProp="image"
          />
        </div>
      </div>
      <div className={s.content}>
        <div
          className="body_2"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: news?.content || '' }}
          style={{ whiteSpace: 'pre-line' }}
        />

        <Button variant="link" as={Link} href={paths.news}>
          <ArrowSmLeftIcon /> Назад к новостям
        </Button>
      </div>
    </div>
  );
};
