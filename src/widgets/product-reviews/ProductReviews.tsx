import { ReviewCard } from '@/entities/review-card';
import { ReviewT } from '@/shared/api/reviews/types';
import React from 'react';
import s from './ProductReviews.module.scss';
import { Button } from '@/shared/ui/button';
import { StarIcon } from '@/shared/assets';
import clsx from 'clsx';
import { AddReviewsForm } from '@/widgets/add-reviews-form/AddReviewsForm';

export const ProductReviews = ({
  reviews,
  productId,
  variant,
}: {
  reviews: ReviewT[] | null;
  productId: string;
  variant?: string;
}) => {
  return (
    <div className={s.container}>
      <div className={s.addReview}>
        <p className={clsx(s.rating, 'h2')}>
          <StarIcon />
          {reviews && reviews.length > 0
            ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
            : 0}
        </p>
        <AddReviewsForm productId={productId}>
          <Button variant="primary" className={s.addReviewButton}>
            Добавить свой отзыв
          </Button>
        </AddReviewsForm>
      </div>
      <div className={s.reviews} itemScope itemType="http://schema.org/ItemList">
        {reviews?.map((review) => <ReviewCard key={review.id} review={review} variant={variant} />)}
      </div>
    </div>
  );
};
