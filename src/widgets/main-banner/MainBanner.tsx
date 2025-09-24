import React from 'react';
import s from './MainBanner.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@/shared/ui/button';
import { SettingsT } from '@/shared/api/design/types';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import Link from 'next/link';

export const MainBanner = ({
  banner,
  variant,
  isInner = false,
}: {
  banner: SettingsT['main_banner'] | null;
  variant?: string;
  isInner?: boolean;
}) => {
  if (!banner) return null;

  return (
    <div className={clsx(s.container, { [s.inner]: isInner })}>
      <Image
        src={`${getStoreBaseUrl(variant)}/${banner?.photo}`}
        alt="main-banner"
        fill
        className={clsx(s.image, 'desktop-only')}
      />
      <Image
        src={`${getStoreBaseUrl(variant)}/${banner?.mobile_photo}`}
        alt="main-banner"
        fill
        className={clsx(s.image, 'mobile-only')}
      />
      <div className={s.content}>
        <div className={s.heading}>
          <div
            className={clsx(s.type, isInner ? 'body_6' : 'body_4')}
            dangerouslySetInnerHTML={{ __html: banner?.tag || '' }}
          />
          <div
            className={clsx(isInner ? 'h5' : 'h3')}
            dangerouslySetInnerHTML={{ __html: banner?.title || '' }}
          />
        </div>
        <div className={s.caption}>
          <div
            className={clsx(s.type, isInner ? 'body_4' : 'body_3')}
            dangerouslySetInnerHTML={{ __html: banner?.description || '' }}
          />
          <Button
            fullWidth
            as={Link}
            href={banner?.button_url || ''}
            className={clsx(s.button, { [s.inner]: isInner })}
            variant={isInner ? 'outlined' : 'primary'}
          >
            <span dangerouslySetInnerHTML={{ __html: banner?.button_text || '' }} />
          </Button>
        </div>
      </div>
    </div>
  );
};
