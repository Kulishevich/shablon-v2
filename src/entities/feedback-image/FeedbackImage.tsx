import Image from 'next/image';
import React from 'react';
import s from './FeedbackImage.module.scss';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const FeedbackImage = ({ image, variant }: { image: string; variant?: string }) => {
  return (
    <div className={s.container}>
      <Image src={`${getStoreBaseUrl(variant)}/${image}`} fill alt="feedback" />
    </div>
  );
};
