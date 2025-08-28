import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ReviewT } from '@/shared/api/reviews/types';
import clsx from 'clsx';
import { StarIcon } from '@/shared/assets';
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
      <div className={s.head}>
        <div className={s.imageContainer}>
          <Image src={`${getStoreBaseUrl(variant)}/${author_photo}`} fill alt="profile" />
        </div>
        <div className={s.nameContainer}>
          <p className="body_3" itemProp="author">
            {author_name}
          </p>
          <span className={clsx(s.date, 'tag')} itemProp="datePublished">
            {new Date(created_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className={s.startRating} itemProp="reviewRating">
        {new Array(5).fill('').map((_, index) => (
          <StarIcon key={index} className={clsx(index < rating && s.active)} />
        ))}
      </div>

      <div className={s.textContainer}>
        <h3 className="h5" itemProp="name">
          {title}
        </h3>
        <p className={clsx('body_4', is_card && s.textClamp)} itemProp="reviewBody">
          {review_text}
        </p>
      </div>
    </>
  );
};
