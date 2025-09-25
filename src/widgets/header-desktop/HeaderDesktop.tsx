import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { Search } from './Search/Search';
import s from './HeaderDesktop.module.scss';
import { CategoryT } from '@/shared/api/category/types';
import { ContactsT } from '@/shared/api/design/types';
import { HeaderFixed } from './HeaderFixed';
import clsx from 'clsx';

interface HeaderDesktopProps {
  categories: CategoryT[];
  contacts: ContactsT | null;
  variant?: 'home' | 'default';
  siteVariant: string;
}

export const HeaderDesktop = ({
  categories,
  contacts,
  variant = 'default',
  siteVariant,
}: HeaderDesktopProps) => {
  return (
    <>
      <header className={clsx(s.container, s[variant])} data-header-desktop>
        <Navigation phones={contacts?.phones || []} variant={variant} />
        <Search categories={categories} variant={variant} siteVariant={siteVariant} />
      </header>
      <HeaderFixed categories={categories} contacts={contacts} siteVariant={siteVariant} />
    </>
  );
};
