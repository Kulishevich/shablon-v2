import s from './styles.module.scss';
import { paths } from '@/shared/config/constants/paths';
import Link from 'next/link';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import clsx from 'clsx';
import { ArrowRightIcon } from '@/shared/assets';
import Image from 'next/image';

interface ServiceCardProps {
  variant?: string;
  className?: string;
  title: string;
  slug: string;
  photo_path: string;
}

export const ServiceCard = ({ variant, className, title, slug, photo_path }: ServiceCardProps) => {
  return (
    <Link href={`${paths.services}/${slug}`} className={clsx(s.card, className)}>
      <div className={s.card__contentWrapper}>
        <div className={s.card__content}>
          <p className="h3">{title}</p>
        </div>

        <ArrowRightIcon />
      </div>

      <Image src={`${photo_path}`} fill alt="service-image" />

      <div className={s.card__background} />
    </Link>
  );
};
