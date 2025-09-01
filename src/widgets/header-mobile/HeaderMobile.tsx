'use client';
import React, { useEffect, useState } from 'react';
import s from './HeaderMobile.module.scss';
import { Logo } from '@/shared/ui/logo';
import { Button } from '@/shared/ui/button';
import { PhoneOutlinedIcon, ShoppingCartIcon } from '@/shared/assets';
import Link from 'next/link';
import { paths } from '@/shared/config/constants/paths';
import { HeaderBurgerMenu } from '@/features/header-burger-menu';
import { HeaderSearchPopup } from '@/features/header-search-popup';
import { CategoryT } from '@/shared/api/category/types';
import { ContactsT } from '@/shared/api/design/types';
import { ReduxProvider } from '@/shared/lib/redux/providers/ReduxProvider';
import clsx from 'clsx';

interface HeaderMobileProps {
  categories: CategoryT[] | null;
  contacts: ContactsT | null;
  variant?: 'home' | 'default';
}

export const HeaderMobile = ({ categories, contacts, variant = 'default' }: HeaderMobileProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 577);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={clsx(s.container, s[variant], scrolled && s.scrolled)}>
      <Logo variant="secondary" />
      <div className={s.buttonsContainer}>
        <Button
          variant="icon_secondary"
          aria-label="Связаться с нами"
          as={Link}
          href={`tel:${contacts?.phones[0]}`}
        >
          <PhoneOutlinedIcon />
        </Button>
        <ReduxProvider>
          <HeaderSearchPopup categories={categories} />
        </ReduxProvider>
        <Button variant="icon_secondary" as={Link} href={paths.cart} aria-label="Корзина">
          <ShoppingCartIcon />
        </Button>
        <HeaderBurgerMenu categories={categories} contacts={contacts} />
      </div>
    </div>
  );
};
