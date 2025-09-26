import React from 'react';
import s from './ReviewCard.module.scss';
import { ReviewT } from '@/shared/api/reviews/types';
import { ReviewPopup } from '../review-popup';
import Image from 'next/image';
import { CircleIcon, QuotesIcon } from '@/shared/assets';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';
import clsx from 'clsx';

export const ReviewCard = ({ review, variant }: { review: ReviewT; variant?: string }) => {
  const { author_name, author_photo, created_at, title, review_text } = review;

  return (
    <div className={s.container} itemScope itemType="http://schema.org/Review">
      <QuotesIcon className={s.quotes} />

      <div className={s.textContainer}>
        <h3 className="h4" itemProp="name">
          {title}
        </h3>
        <p className={clsx('body_3', s.textClamp)} itemProp="reviewBody">
          {review_text}
        </p>
      </div>
      <ReviewPopup review={review} variant={variant} />

      <div className={s.head}>
        <div className={s.imageContainer}>
          <Image src={`${getStoreBaseUrl(variant)}/${author_photo}`} fill alt="profile" />
        </div>
        <div className={s.nameContainer}>
          <p className="h6" itemProp="author">
            {author_name}
          </p>
          <span className={clsx(s.date, 'body_6')} itemProp="datePublished">
            Онлайн-покупатель кресла Valencia
            <CircleIcon className={s.circle} />
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
