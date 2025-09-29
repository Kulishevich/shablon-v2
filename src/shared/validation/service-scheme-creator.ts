import {
  checkedScheme,
  commentScheme,
  emailScheme,
  nameScheme,
  phoneScheme,
} from '@/shared/validation/validation';
import { z } from 'zod';
import { validation } from './validation.errors';

export const ServiceFormScheme = () => {
  return z.object({
    name: nameScheme(),
    phone: phoneScheme(),
    email: emailScheme(),
    service: z.string().trim().min(1, { message: validation.requiredField }),
    comment: commentScheme(),
    checked: checkedScheme(),
  });
};
