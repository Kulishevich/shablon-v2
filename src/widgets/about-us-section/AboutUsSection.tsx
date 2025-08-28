import React from 'react';
import s from './AboutUsSection.module.scss';
import Image from 'next/image';
import { Logo } from '@/shared/ui/logo';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const AboutUsSection = ({
  text,
  image,
  variant,
}: {
  text: string;
  image: string;
  variant?: string;
}) => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <div>
          <h2 className="h2">О нас</h2>
          <p className="body_2">{text}</p>
        </div>
        <Logo variant="primary" />
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
  );
};
