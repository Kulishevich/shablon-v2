'use client';
import React from 'react';
import s from './OrderForm.module.scss';
import { DeliveryCard } from '@/entities/delivery-card';
import { Button } from '@/shared/ui/button';
import { ArrowRightUpIcon } from '@/shared/assets';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { PaymentMethodCard } from '@/entities/payment-method-card';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@/shared/ui/controlled-text-field';
import { ControlledTextArea } from '@/shared/ui/controlled-text-area/ControlledTextArea';
import { PaymentT } from '@/shared/api/payment-methods/types';
import { DeliveryT } from '@/shared/api/delivery-methods/types';
import { ControlledPhoneField } from '@/shared/ui/controlled-phone-field';
import clsx from 'clsx';

export const OrderForm = ({
  paymentMethods,
  deliveryMethods,
}: {
  paymentMethods: PaymentT[] | null;
  deliveryMethods: DeliveryT[] | null;
}) => {
  const { control, watch, setValue } = useFormContext();

  const deliveryMethodId = watch('delivery_method_id');
  const paymentMethodId = watch('payment_method_id');
  const deliveryCost = watch('delivery_cost');

  // Определяем самовывоз как метод доставки с нулевой стоимостью
  const isPickup = deliveryCost === 0;

  return (
    <div className={s.container}>
      <div className={s.elem}>
        <div className={s.title}>
          <span className="h6">1</span>
          <p className="h3">Укажите ваши контакты</p>
        </div>
        <div className={s.contacts}>
          <ControlledTextField
            control={control}
            name="name"
            placeholder="Имя"
            label="Имя"
            isRequired
          />
          <ControlledPhoneField
            control={control}
            name="phone"
            placeholder="Телефон"
            label="Телефон"
            isRequired
            mask="+375 (99) 999-99-99"
          />
          <ControlledTextField
            control={control}
            name="surname"
            placeholder="Фамилия"
            label="Фамилия"
            isRequired
          />
          <ControlledTextField
            control={control}
            name="email"
            placeholder="Email"
            label="Email"
            isRequired
          />
          <ControlledTextField
            control={control}
            name="patronymic"
            placeholder="Отчество"
            label="Отчество(если есть)"
          />
        </div>
      </div>

      <div className={s.elem}>
        <div className={s.title}>
          <div>
            <span className="h6">2</span>
            <p className="h3">Выберите способ доставки</p>
          </div>
          <Button
            variant="link"
            as={Link}
            href={paths.payment_and_delivery}
            className={'desktop-only'}
          >
            О доставке <ArrowRightUpIcon />
          </Button>
        </div>
        <div className={s.delivery}>
          {deliveryMethods?.map((item) => (
            <DeliveryCard
              {...item}
              key={item.id}
              active={deliveryMethodId === item.id}
              onClick={() => {
                setValue('delivery_cost', +item.cost);
                setValue('delivery_method_id', item.id);
              }}
            />
          ))}
        </div>
        <Button
          variant="link"
          as={Link}
          href={paths.payment_and_delivery}
          className={'mobile-only'}
        >
          О доставке <ArrowRightUpIcon />
        </Button>
      </div>

      <div className={clsx(s.elem, { [s.disabled]: isPickup })}>
        <div className={s.title}>
          <span className="h6">3</span>
          <p className="h3">Укажите адрес доставки</p>
        </div>
        <div className={s.address}>
          <ControlledTextField
            control={control}
            name="address"
            label="Адрес доставки"
            placeholder="Введите адрес доставки"
            isRequired
            disabled={!deliveryCost}
          />
          <ControlledTextArea
            control={control}
            name="comment"
            label="Комментарий"
            placeholder="Комментарий"
            className={s.textarea}
          />
        </div>
      </div>

      <div className={s.elem}>
        <div className={s.title}>
          <div>
            <span className="h6">4</span>
            <p className="h3">Способ оплаты</p>
          </div>
          <Button
            variant="link"
            as={Link}
            href={paths.payment_and_delivery}
            className={'desktop-only'}
          >
            Об оплате <ArrowRightUpIcon />
          </Button>
        </div>
        <div className={s.paymentMethod}>
          {paymentMethods?.map((item) => (
            <PaymentMethodCard
              {...item}
              key={item.id}
              active={paymentMethodId === item.id}
              onClick={() => setValue('payment_method_id', item.id)}
            />
          ))}
        </div>
        <Button
          variant="link"
          as={Link}
          href={paths.payment_and_delivery}
          className={'mobile-only'}
        >
          Об оплате <ArrowRightUpIcon />
        </Button>
      </div>
    </div>
  );
};
