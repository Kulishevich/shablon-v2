'use client';
import { useEffect, useState } from 'react';
import s from './VariantsSettings.module.scss';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import { SiteSettingsIcon, StylesSettingsIcon, VariantsSettingsIcon } from '@/shared/assets';
import clsx from 'clsx';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { clearCart, clearPromocode } from '@/shared/lib/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';

const siteVariants = [
  {
    id: '1',
    name: 'Косметика',
    value: 'kosmetika',
    image: '/variant-6.png',
  },
  {
    id: '2',
    name: 'Для дома',
    value: 'dlyadoma',
    image: '/variant-7.png',
  },
  {
    id: '3',
    name: 'Одежда',
    value: 'odejda',
    image: '/variant-1.png',
  },
  {
    id: '4',
    name: 'Авто',
    value: 'auto',
    image: '/variant-2.png',
  },
  {
    id: '5',
    name: 'Техника',
    value: 'tehnika',
    image: '/variant-3.png',
  },
  {
    id: '6',
    name: 'Подарок',
    value: 'podarok',
    image: '/variant-4.png',
  },
  {
    id: '7',
    name: 'Стройка',
    value: 'stroyka',
    image: '/variant-5.png',
  },
];

export const VariantsSettings = ({ onClose }: { onClose: () => void }) => {
  const [tab, setTab] = useState<'style' | 'variant' | 'fonts'>('variant');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const variant = searchParams.get('variant');
  const currentVariant = Cookies.get('variant');
  const dispatch = useDispatch();

  const handleChangeVariantSite = (value: string) => {
    Cookies.set('variant', value, {
      expires: 365,
      path: '/',
    });

    onClose();

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

  useEffect(() => {
    console.log('variant', currentVariant);
  }, [variant]);

  return (
    <div className={s.container}>
      <div className={s.sidebar}>
        <Image
          src={'/webspace.svg'}
          alt="webspace logo"
          width={190}
          height={46}
          className={s.logo}
        />

        <div className={s.tabs}>
          <Button
            variant="white"
            onClick={() => setTab('style')}
            className={clsx(s.tab, { [s.active]: tab === 'style' })}
          >
            <StylesSettingsIcon />
            <span>Стилистики</span>
          </Button>
          <Button
            variant="white"
            onClick={() => setTab('variant')}
            className={clsx(s.tab, { [s.active]: tab === 'variant' })}
          >
            <VariantsSettingsIcon />
            <span>Тематики</span>
          </Button>
          <Button
            variant="white"
            onClick={() => setTab('fonts')}
            className={clsx(s.tab, { [s.active]: tab === 'fonts' })}
          >
            <SiteSettingsIcon />
            <span>Шрифты и цвета</span>
          </Button>
        </div>

        <div className={s.info}>
          <div className={s.caption}>
            <span className={'body_7'}>Дизайн и разработка:</span>
            <Link href="https://web-space.by/" target="_blank" className={'body_7'}>
              Web-space.by
            </Link>
          </div>
        </div>
      </div>

      {tab === 'style' && (
        <div className={s.style}>
          <div className={s.styleItem}>
            <Image src={'/styles-1.png'} alt="Стилистика 1" width={392} height={192} />
            <span className={'h6'}>Стилистика 1</span>
          </div>
          <div className={clsx(s.styleItem, s.active)}>
            <Image src={'/styles-2.png'} alt="Стилистика 2" width={392} height={192} />
            <span className={'h6'}>Стилистика 2</span>
          </div>
        </div>
      )}

      {tab === 'variant' && (
        <div className={s.variants}>
          {siteVariants.map((variantItem) => (
            <div
              className={clsx(s.variantItem, { [s.active]: variantItem.value === currentVariant })}
              key={variantItem.id}
              onClick={() => handleChangeVariantSite(variantItem.value)}
            >
              <Image src={variantItem.image} alt={variantItem.name} width={180} height={180} />
              <span className={'h6'}>{variantItem.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
