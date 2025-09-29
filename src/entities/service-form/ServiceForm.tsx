'use client';
import s from './ServiceForm.module.scss';
import { Button } from '@/shared/ui/button';
import { showToast } from '@/shared/ui/toast';
import { useForm } from 'react-hook-form';
import { ControlledTextField } from '@/shared/ui/controlled-text-field';
import { ControlledTextArea } from '@/shared/ui/controlled-text-area/ControlledTextArea';
import { postFeedback } from '@/shared/api/feedback/postFeedback';
import { ControlledCheckbox } from '@/shared/ui/controlled-checkbox';
import { ServiceFormScheme } from '@/shared/validation/service-scheme-creator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ControlledPhoneField } from '@/shared/ui/controlled-phone-field';
import clsx from 'clsx';

export const ServiceForm = ({
  variant,
  service,
  handleClose,
}: {
  variant?: string;
  service: string;
  handleClose: () => void;
}) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: service,
      comment: '',
      checked: false,
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ServiceFormScheme()),
  });

  const formHandler = handleSubmit(async (data) => {
    const { comment, name, phone, email, service } = data;

    try {
      showToast({
        variant: 'success',
        title: 'Спасибо за вашу заявку!',
        message: 'Скоро с вами свяжется наш менеджер и ответит на все ваши вопросы',
      });
      handleClose();
    } catch (err) {
      console.error(err);
      showToast({
        variant: 'error',
        title: 'Не получили вашу заявку...',
        message: 'К сожалению, не получили вашу заявку. Повторите попытку снова.',
      });
    }
  });

  return (
    <form onSubmit={formHandler} className={s.formContainer}>
      <p className={clsx(s.title, 'h2')}>Заказать услугу</p>
      <div className={s.form}>
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
        <ControlledTextField
          control={control}
          name="email"
          placeholder="Введите ваш email"
          label="Ваш email"
          isRequired
          type="email"
        />
        <ControlledTextField
          control={control}
          name="service"
          placeholder="Введите название услуги"
          label="Услуга"
          isRequired
        />
        <ControlledTextArea
          control={control}
          name="comment"
          placeholder="Комментарий"
          label="Комментарий"
          className={s.textarea}
        />
        <div className={s.checkboxContainer}>
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
