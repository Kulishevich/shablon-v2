import React from 'react';
import s from './AboutUsSection.module.scss';
import Image from 'next/image';
import { Logo } from '@/shared/ui/logo';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import { AdvantageType } from '@/shared/api/advantages/types';
import { AdvantageCard } from '@/entities/advantage-card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';

interface AboutUsSectionProps {
  advantages: AdvantageType[];
  text: string;
  image: string;
  variant?: string;
  style?: React.CSSProperties;
}

export const AboutUsSection = ({
  text,
  image,
  variant,
  advantages,
  style,
}: AboutUsSectionProps) => {
  return (
    <div className={s.wrapper} style={style}>
      <div className={s.container}>
        <div className={s.content}>
          <div>
            <h2 className="h2">О нас</h2>
            <p className="body_2">{text}</p>
          </div>
          <Button as={Link} href={paths.about_us} className={s.aboutLink}>
            Подробнее
          </Button>
        </div>
        <div className={s.imageContainer}>
          <Image
            src={`${getStoreBaseUrl(variant)}/${image}`}
            fill
            alt="about-us"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="eager"
            priority
          />
        </div>
      </div>

      <div className={s.advantagesContainer}>
        {advantages?.map((elem, index) => <AdvantageCard {...elem} key={index} />)}
      </div>
    </div>
  );
};
