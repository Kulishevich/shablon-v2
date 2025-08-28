'use client';
import React, { useEffect, useState } from 'react';
import s from './CartSection.module.scss';
import { Button } from '@/shared/ui/button';
import { ArrowRightUpIcon } from '@/shared/assets';
import { CartTable } from '@/features/cart-table';
import { CartPrice } from '@/features/cart-price';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, clearPromocode } from '@/shared/lib/redux/slices/cartSlice';
import SectionAnimationWrapper from '@/shared/ui/section/SectionAnimationWrapper';
import { RootState } from '@/shared/lib/redux/store';
import { checkCartPriceWitchPromocode } from '@/shared/api/promocode/checkCartPriceWitchPromocode.ts';
import { getPriceWithoutDiscount } from '@/shared/lib/utils/getPriceWithoutDiscount';
import { getPriceWithDiscount } from '@/shared/lib/utils/getPriceWithDiscount';
import Cookies from 'js-cookie';

export const CartSection = () => {
  const [variant, setVariant] = useState<string | undefined>(undefined);

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

  return (
    <SectionAnimationWrapper>
      <div className={s.container}>
        <div className={s.title}>
          <h1 className="h1">Корзина</h1>
          <Button variant="link" as="button" onClick={() => dispatch(clearCart())}>
            Очистить корзину
            <ArrowRightUpIcon />
          </Button>
        </div>
        <div className={s.content}>
          <CartTable productsState={productsState} />
          <CartPrice
            priceWithOutDiscount={priceWithOutDiscount}
            priceWithDiscount={priceWithDiscount}
            productsCart={productsCart}
            promocode={promocode}
            setProductsState={setProductsState}
            setPromocodeDiscount={setPromocodeDiscount}
          />
        </div>
      </div>
    </SectionAnimationWrapper>
  );
};
