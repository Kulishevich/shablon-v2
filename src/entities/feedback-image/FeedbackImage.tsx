import Image from 'next/image';
import React from 'react';
import s from './FeedbackImage.module.scss';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import clsx from 'clsx';

export const FeedbackImage = ({
  image,
  variant,
  className,
}: {
  image: string;
  variant?: string;
  className?: string;
}) => {
  return (
    <div className={clsx(s.container, className)}>
      <Image src={`${getStoreBaseUrl(variant)}/${image}`} fill alt="feedback" />
    </div>
  );
};
