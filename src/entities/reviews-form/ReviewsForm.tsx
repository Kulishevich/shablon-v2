'use client';
import s from './ReviewsForm.module.scss';
import { Button } from '@/shared/ui/button';
import { showToast } from '@/shared/ui/toast';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@/shared/ui/controlled-text-field';
import { ControlledTextArea } from '@/shared/ui/controlled-text-area/ControlledTextArea';
import { ControlledCheckbox } from '@/shared/ui/controlled-checkbox';
import { ControlledFileInput } from '@/shared/ui/controlled-file-input';
import { ReviewsFormScheme } from '@/shared/validation/reviews-scheme-creator';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { ControlledRatingField } from '@/shared/ui/controlled-rating-field';
import { ControlledPhoneField } from '@/shared/ui/controlled-phone-field';
import { postProductReview } from '@/shared/api/reviews/postProductReview';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export const ReviewsForm = ({
  closeModal,
  productId,
}: {
  closeModal: () => void;
  productId: string;
}) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      title: '',
      comment: '',
      rating: 5,
      photo: undefined as File | undefined,
      checked: false,
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ReviewsFormScheme()),
  });

  const formHandler = handleSubmit(async (data) => {
    try {
      const response = await postProductReview({ review: data, variant, productId });

      if (response?.success) {
        showToast({
          variant: 'success',
          title: 'Отзыв успешно отправлен',
          message: response.message,
        });
        reset();
        closeModal();
      } else {
        showToast({
          variant: 'error',
          title: 'Не удалось отправить отзыв...',
          message: 'К сожалению, не удалось отправить ваш отзыв. Повторите попытку снова.',
        });
      }
    } catch (err) {
      console.error(err);
      showToast({
        variant: 'error',
        title: 'Не удалось отправить отзыв...',
        message: 'К сожалению, не удалось отправить ваш отзыв. Повторите попытку снова.',
      });
    }
  });

  return (
    <form onSubmit={formHandler} className={s.formContainer}>
      <h2 className={clsx(s.title, 'h2')}>Добавить отзыв</h2>
      <div className={s.form}>
        <div className={s.fieldsContainer}>
          <ControlledTextField
            control={control}
            name="name"
            placeholder="Введите ваше имя"
            label="Ваше имя"
            isRequired
          />
          <ControlledPhoneField
            control={control}
            name="phone"
            placeholder="Введите ваш телефон"
            label="Ваш телефон"
            isRequired
            mask="+375 (99) 999-99-99"
          />
        </div>
        <ControlledRatingField control={control} name="rating" label="Рейтинг" isRequired />
        <ControlledTextField
          control={control}
          name="title"
          placeholder="Заголовок"
          label="Заголовок"
          isRequired
          type="text"
        />
        <ControlledTextArea
          control={control}
          name="comment"
          placeholder="Отзыв"
          isRequired
          label="Отзыв"
          className={s.textarea}
        />

        <div className={s.fieldsContainer}>
          <ControlledFileInput
            control={control}
            name="photo"
            placeholder="Загрузите фото (в формате jpeg, png)"
            acceptedTypes="image/png,image/jpeg"
          />
          <ControlledCheckbox
            control={control}
            name="checked"
            label="Согласие на обработку персональных данных"
            privacyPolicy
          />
        </div>
      </div>
      <Button type="submit" className={s.submitButton} disabled={!isValid}>
        Отправить
      </Button>
    </form>
  );
};
