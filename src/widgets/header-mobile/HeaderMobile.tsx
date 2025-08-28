import React from 'react';
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

export const HeaderMobile = ({
  categories,
  contacts,
}: {
  categories: CategoryT[] | null;
  contacts: ContactsT | null;
}) => {
  return (
    <div className={s.container}>
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
