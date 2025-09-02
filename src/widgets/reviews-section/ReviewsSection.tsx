import { ReviewCard } from '@/entities/review-card';
import { SliderWrapper } from '@/entities/slider-wrapper';
import { ReviewT } from '@/shared/api/reviews/types';
import React from 'react';

export const ReviewsSection = ({
  reviews,
  variant,
}: {
  reviews: ReviewT[] | null;
  variant?: string;
}) => {
  return (
    !!reviews?.length && (
      <SliderWrapper title="Отзывы покупателей" variant="news" itemsCount={reviews?.length}>
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} variant={variant} />
        ))}
      </SliderWrapper>
    )
  );
};
