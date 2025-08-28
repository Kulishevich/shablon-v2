import {
  checkedScheme,
  nameScheme,
  phoneScheme,
  titleScheme,
  ratingScheme,
  imageFileScheme,
  commentReviewScheme,
} from '@/shared/validation/validation';
import { z } from 'zod';

export const ReviewsFormScheme = () => {
  return z.object({
    name: nameScheme(),
    phone: phoneScheme(),
    title: titleScheme(),
    comment: commentReviewScheme(),
    rating: ratingScheme(),
    photo: imageFileScheme(),
    checked: checkedScheme(),
  });
};
