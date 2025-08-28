import {
  addressScheme,
  checkedScheme,
  commentScheme,
  emailScheme,
  nameScheme,
  phoneScheme,
  patronymicScheme,
} from '@/shared/validation/validation';
import { z } from 'zod';
import { validation } from './validation.errors';

export const createOrderFormSchema = (isPickup: boolean = false) => z.object({
  name: nameScheme(),
  surname: nameScheme(),
  patronymic: patronymicScheme(),
  phone: phoneScheme(),
  email: emailScheme(),
  delivery_method_id: z
    .number({
      required_error: 'Выберите способ доставки',
      invalid_type_error: 'Некорректный способ доставки',
    })
    .int()
    .min(1, 'Выберите способ доставки'),
  delivery_cost: z.number(),
  address: isPickup
    ? z.string().optional()
    : addressScheme(),
  comment: z.string().max(300, validation.maxLength),
  promo_code: z.string().max(300, validation.maxLength),
  payment_method_id: z
    .number({
      required_error: 'Выберите способ оплаты',
      invalid_type_error: 'Некорректный способ оплаты',
    })
    .int()
    .min(1, 'Выберите способ оплаты'),
  checked: checkedScheme(),
});

// Оставляем старую схему для обратной совместимости
export const orderFormSchema = createOrderFormSchema();
