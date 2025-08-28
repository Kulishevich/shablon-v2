import { Button } from '@/shared/ui/button';
import React, { useEffect, useState } from 'react';
import s from './OrderPrice.module.scss';
import { ControlledCheckbox } from '@/shared/ui/controlled-checkbox';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from '@/shared/ui/controlled-text-field';
import { checkCartPriceWitchPromocode } from '@/shared/api/promocode/checkCartPriceWitchPromocode.ts';
import { CartProduct, clearPromocode, setPromocode } from '@/shared/lib/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { showToast } from '@/shared/ui/toast';
import Cookies from 'js-cookie';

export const OrderPrice = ({
  priceWithOutDiscount,
  priceWithDiscount,
  productsCart,
}: {
  priceWithOutDiscount: number;
  priceWithDiscount: number;
  productsCart: CartProduct[];
}) => {
  const [variant, setVariant] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const { control, watch } = useFormContext();

  const deliveryCost = watch('delivery_cost');
  const promocode = watch('promo_code');

  useEffect(() => {
    const cookieVariant = Cookies.get('variant');
    setVariant(cookieVariant);
  }, []);
  const handleCheckPromocode = async () => {
    try {
      const res = await checkCartPriceWitchPromocode({
        reqData: {
          code: promocode,
          products: productsCart.map((elem) => ({ id: elem.id, quantity: elem.quantity })),
        },
        variant,
      });
      if (Number(res.min_order_amount) <= priceWithOutDiscount) {
        showToast({ variant: 'success', title: 'Промокод активирован' });
        dispatch(setPromocode(promocode));
      } else {
        showToast({ variant: 'error', title: 'Сумма в вашей корзине меньше нужной' });
        dispatch(clearPromocode());
      }
    } catch (err) {
      showToast({ variant: 'error', title: 'Промокод не действителен' });
      dispatch(clearPromocode());
      console.log(err);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.promocode}>
        <ControlledTextField
          control={control}
          name="promo_code"
          className={s.input}
          placeholder="Промокод"
        />
        <Button variant="secondary" onClick={handleCheckPromocode}>
          Применить
        </Button>
      </div>
      <div className={s.price}>
        <div className={s.elem}>
          <p className="body_7">Стоимость товаров без скидки</p>
          <h5 className="h5">{priceWithOutDiscount.toFixed(2)} BYN</h5>
        </div>
        <div className={s.elem}>
          <p className="body_7">Скидка</p>
          <h5 className="h5">{(priceWithOutDiscount - priceWithDiscount).toFixed(2)} BYN</h5>
        </div>
        <div className={s.elem}>
          <p className="body_7">Стоимость доставки</p>
          <h5 className="h5">{deliveryCost} BYN</h5>
        </div>
      </div>
      <div className={s.elem}>
        <h5 className="h5">Итого</h5>
        <h3 className="h3">{(priceWithDiscount + deliveryCost).toFixed(2)} BYN</h3>
      </div>
      <ControlledCheckbox
        control={control}
        name="checked"
        label="Согласие на обработку персональных данных"
      />
      <Button type="submit" className={s.button}>
        Оформить заказ
      </Button>
    </div>
  );
};
