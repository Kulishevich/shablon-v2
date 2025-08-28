import { z } from 'zod';
import { validation } from './validation.errors';

export const nameScheme = () => z.string().trim().min(2, { message: validation.requiredField });

export const patronymicScheme = () =>
  z.string().trim().optional();

export const addressScheme = () => z.string().trim().min(5, { message: validation.requiredField });

export const commentScheme = () =>
  z.string().trim().max(300, { message: validation.maxLength }).optional();

export const commentReviewScheme = () =>
  z.string().trim().min(10, { message: validation.minLength }).max(300, { message: validation.maxLength });

export const checkedScheme = () =>
  z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: validation.agreeToTerms,
    });

export const phoneScheme = () =>
  z
    .string()
    .trim()
    .min(19, { message: validation.requiredField })
    .max(19, { message: validation.maxLength })
    .regex(/^[0-9+\-\s()]*$/, {
      message: 'Номер может содержать только цифры, пробелы, скобки, тире и знак +',
    });

export const emailScheme = () =>
  z
    .string()
    .email({
      message: validation.email,
    })
    .toLowerCase();

export const titleScheme = () =>
  z
    .string()
    .trim()
    .min(1, { message: validation.requiredField })
    .max(100, { message: validation.maxLength });

export const ratingScheme = () => z.number().min(1).max(5);

export const imageFileScheme = () =>
  z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        message: 'Размер файла не должен превышать 5MB',
      }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ['image/jpeg', 'image/png'].includes(file.type);
      },
      {
        message: 'Поддерживаются только файлы формата PNG и JPEG',
      }
    );
