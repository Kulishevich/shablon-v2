import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ReviewT } from '@/shared/api/reviews/types';
import clsx from 'clsx';
import { CircleIcon, QuotesIcon, StarIcon } from '@/shared/assets';
import s from './ReviewContent.module.scss';
import { getStoreBaseUrl } from '@/shared/lib/utils/getBaseUrl';

export const ReviewContent = ({
  review,
  is_card = false,
  variant,
}: {
  review: ReviewT;
  is_card?: boolean;
  variant?: string;
}) => {
  const { author_name, author_photo, rating, created_at, title, review_text } = review;

  return (
    <>
      <QuotesIcon className={s.quotes} />

      <div className={s.textContainer}>
        <h3 className="h4" itemProp="name">
          {title}
        </h3>
        <p className={clsx('body_3', s.textClamp)} itemProp="reviewBody">
          {review_text}
        </p>
      </div>

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
    </>
  );
};
