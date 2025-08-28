import React from 'react';
import s from './ReviewCard.module.scss';
import { ReviewT } from '@/shared/api/reviews/types';
import { ReviewPopup } from '../review-popup';
import { ReviewContent } from '../review-content';

export const ReviewCard = ({ review, variant }: { review: ReviewT; variant?: string }) => {
  return (
    <div className={s.container} itemScope itemType="http://schema.org/Review">
      <ReviewContent review={review} is_card variant={variant} />
      <ReviewPopup review={review} variant={variant} />
    </div>
  );
};
