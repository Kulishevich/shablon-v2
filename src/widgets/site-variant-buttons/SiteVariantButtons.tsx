'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/shared/ui/button';
import s from './SiteVariantButtons.module.scss';
import { CollapseFilter } from '@/shared/ui/collapse-filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { clearCart, clearPromocode } from '@/shared/lib/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';

const siteVariants = [
  {
    id: '1',
    name: 'Косметика',
    value: 'kosmetika',
  },
  {
    id: '2',
    name: 'Для дома',
    value: 'dlyadoma',
  },
  {
    id: '3',
    name: 'Одежда',
    value: 'odejda',
  },
  {
    id: '4',
    name: 'Авто',
    value: 'auto',
  },
  {
    id: '5',
    name: 'Техника',
    value: 'tehnika',
  },
  {
    id: '6',
    name: 'Подарок',
    value: 'podarok',
  },
  {
    id: '7',
    name: 'Стройка',
    value: 'stroyka',
  },
];

export const SiteVariantButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant');
  const dispatch = useDispatch();

  const handleChangeVariantSite = (value: string) => {
    Cookies.set('variant', value, {
      expires: 365,
      path: '/',
    });

    dispatch(clearCart());
    localStorage.removeItem('viewed_products_shablon');
    localStorage.removeItem('cart_shablon');

    if (pathname === '/') {
      router.refresh();
    } else {
      router.push('/');
      router.refresh();
    }
  };

  if (variant) {
    handleChangeVariantSite(variant);
  }

  return (
    <div className={s.container}>
      <CollapseFilter title="Варианты сайта">
        {siteVariants.map((variant) => (
          <Button key={variant.id} onClick={() => handleChangeVariantSite(variant.value)}>
            {variant.name}
          </Button>
        ))}
      </CollapseFilter>
    </div>
  );
};
