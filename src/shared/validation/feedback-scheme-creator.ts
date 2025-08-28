import {
  checkedScheme,
  commentScheme,
  nameScheme,
  phoneScheme,
} from '@/shared/validation/validation';
import { z } from 'zod';

export const FeedbackFormScheme = () => {
  return z.object({
    name: nameScheme(),
    phone: phoneScheme(),
    comment: commentScheme(),
    checked: checkedScheme(),
  });
};
