'use client';
import React, { useEffect, useState } from 'react';
import { OrderForm } from '@/features/ordre-form';
import { OrderPrice } from '@/features/order-price';
import s from './OrderSection.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { PaymentT } from '@/shared/api/payment-methods/types';
import { DeliveryT } from '@/shared/api/delivery-methods/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderFormSchema } from '@/shared/validation/order-scheme-creator';
import { postOrder } from '@/shared/api/order/postOrder';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/lib/redux/store';
import { clearCart, clearPromocode } from '@/shared/lib/redux/slices/cartSlice';
import SectionAnimationWrapper from '@/shared/ui/section/SectionAnimationWrapper';
import { showToast } from '@/shared/ui/toast';
import { useRouter } from 'next/navigation';
import { getPriceWithoutDiscount } from '@/shared/lib/utils/getPriceWithoutDiscount';
import { getPriceWithDiscount } from '@/shared/lib/utils/getPriceWithDiscount';
import { checkCartPriceWitchPromocode } from '@/shared/api/promocode/checkCartPriceWitchPromocode.ts';
import Cookies from 'js-cookie';

export const OrderSection = ({
  paymentMethods,
  deliveryMethods,
}: {
  paymentMethods: PaymentT[] | null;
  deliveryMethods: DeliveryT[] | null;
}) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);

  const router = useRouter();
  const productsCart = useSelector((state: RootState) => state.cart.items);
  const promocode = useSelector((state: RootState) => state.cart.promocode);
  const [productsState, setProductsState] = useState(productsCart);
  const priceWithOutDiscount = getPriceWithoutDiscount(productsState);
  const [promocodeDiscount, setPromocodeDiscount] = useState(0);
  const priceWithDiscount = getPriceWithDiscount(productsState) - promocodeDiscount;
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);

  useEffect(() => {
    const handleCheckPromocode = async () => {
      setProductsState(productsCart);
      setPromocodeDiscount(0);
      try {
        const res = await checkCartPriceWitchPromocode({
          reqData: {
            code: promocode,
            products: productsCart.map((elem) => ({ id: elem.id, quantity: elem.quantity })),
          },
          variant,
        });
        if (Number(res.min_order_amount) <= priceWithOutDiscount) {
          if (res.type === 'percentage') {
            setProductsState(
              productsCart.map((product) => ({
                ...product,
                discount:
                  res.products.find((elem) => elem.id === product.id)?.best_discount_percent || '',
              }))
            );
          } else {
            setPromocodeDiscount(+res.value);
          }
        } else {
          dispatch(clearPromocode());
        }
      } catch (err) {
        dispatch(clearPromocode());
      }
    };

    if (!!promocode) {
      handleCheckPromocode();
    } else {
      setProductsState(productsCart);
      setPromocodeDiscount(0);
    }
  }, [promocode, productsCart]);

  const defaultDeliveryCost = Number(deliveryMethods?.[0]?.cost) || 0;
  const isPickup = defaultDeliveryCost === 0;

  const form = useForm({
    defaultValues: {
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      email: '',
      delivery_method_id: deliveryMethods?.[0]?.id,
      delivery_cost: defaultDeliveryCost,
      address: '',
      comment: '',
      payment_method_id: paymentMethods?.[0]?.id,
      checked: false,
      promo_code: promocode,
    },
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: zodResolver(createOrderFormSchema(isPickup)),
  });

  // Отслеживаем изменения стоимости доставки для обновления схемы валидации
  const deliveryCost = form.watch('delivery_cost');
  const currentIsPickup = deliveryCost === 0;

  useEffect(() => {
    // Обновляем схему валидации при изменении типа доставки
    form.clearErrors(); // Очищаем ошибки валидации
    const newResolver = zodResolver(createOrderFormSchema(currentIsPickup));
    // К сожалению, react-hook-form не позволяет динамически менять resolver
    // Поэтому мы очищаем ошибки валидации поля address при переключении на самовывоз
    if (currentIsPickup) {
      form.clearErrors('address');
    }
  }, [currentIsPickup, form]);

  const onSubmit = form.handleSubmit(async (data) => {
    const { checked, name, surname, patronymic, delivery_cost, address, ...otherData } = data;
    const items = productsCart.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
    }));

    // При самовывозе отправляем "самовывоз" в поле адреса
    const orderData = {
      ...otherData,
      customer_name: `${name} ${surname} ${patronymic}`,
      address: currentIsPickup ? 'самовывоз' : address || '',
      items,
    };

    try {
      const res = await postOrder({
        reqData: orderData,
        variant,
      });

      dispatch(clearCart());
      form.reset();
      showToast({
        description: `Номер заказа: ${res.order_number}`,
        variant: 'success',
        title: 'Спасибо за ваш заказ!',
        message: 'Скоро с вами свяжется наш менеджер и уточнит детали',
        duration: 10000,
      });
      router.push('/');
    } catch (err) {
      console.log(err);
      showToast({
        message: 'Пожалуйста, повторите попытку ещё раз',
        variant: 'error',
        title: 'Упс! Кажется, произошла ошибка',
      });
    }
  });

  return (
    <SectionAnimationWrapper>
      <FormProvider {...form}>
        <div className={s.container}>
          <h1 className="h1">Оформление заказа</h1>
          <form onSubmit={onSubmit} className={s.content}>
            <OrderForm paymentMethods={paymentMethods} deliveryMethods={deliveryMethods} />
            <OrderPrice
              priceWithOutDiscount={priceWithOutDiscount}
              priceWithDiscount={priceWithDiscount}
              productsCart={productsCart}
            />
          </form>
        </div>
      </FormProvider>
    </SectionAnimationWrapper>
  );
};
