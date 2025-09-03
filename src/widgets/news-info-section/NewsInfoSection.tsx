import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { ArrowSmLeftIcon, MailingListIcon } from '@/shared/assets';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import s from './NewsInfoSection.module.scss';
import { NewsT } from '@/shared/api/news/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import clsx from 'clsx';

//todo: заменить за данные с API
const tags = ['Мебель и фурнитура', 'Интерьер', 'Кухни'];

export const NewsInfoSection = ({ news, variant }: { news: NewsT | null; variant?: string }) => {
  const date = new Date(news?.created_at || '').toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className={s.wrapper} itemScope itemType="http://schema.org/Article">
      <h1 className="h1" itemProp="headline">
        {news?.title}
      </h1>

      <div className={s.container}>
        <div className={s.firstBlock}>
          <div className={s.tagsContainer}>
            {tags.map((tag) => (
              <button className={clsx(s.tagBtn, 'button')}>{tag}</button>
            ))}
          </div>
          <div className={clsx(s.mailingList, 'desktop-only')}>
            <MailingListIcon className={s.mailingList__icon} />
            <p className={clsx(s.mailingList__title, 'body_3')}>
              Подпишитесь на нашу email-рассылку
            </p>
            <Button className={s.mailingList__btn}>Подписаться</Button>
          </div>
        </div>

        <div className={s.secondBlock}>
          <div className={s.imageContainer}>
            <Image
              src={`${getStoreBaseUrl(variant)}/${news?.photo_path}`}
              fill
              alt="new"
              itemProp="image"
            />
          </div>

          <meta itemProp="datePublished" content={date} />
          <span className={clsx('body_6', s.date)}>{date}</span>

          <div
            className={clsx(s.content, 'body_2')}
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: news?.content || '' }}
            style={{ whiteSpace: 'pre-line' }}
          />

          <Button variant="link" as={Link} href={paths.news}>
            <ArrowSmLeftIcon /> Назад к новостям
          </Button>

          <div className={clsx(s.mailingList, 'mobile-only')}>
            <MailingListIcon className={s.mailingList__icon} />
            <p className={clsx(s.mailingList__title, 'body_3')}>
              Подпишитесь на нашу email-рассылку
            </p>
            <Button className={s.mailingList__btn}>Подписаться</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
