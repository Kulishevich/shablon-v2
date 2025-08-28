import React from 'react';
import { Navigation } from './Navigation/Navigation';
import { Search } from './Search/Search';
import s from './HeaderDesktop.module.scss';
import { CategoryT } from '@/shared/api/category/types';
import { ContactsT } from '@/shared/api/design/types';
import { HeaderFixed } from './HeaderFixed';

export const HeaderDesktop = ({
  categories,
  contacts,
}: {
  categories: CategoryT[];
  contacts: ContactsT | null;
}) => {
  return (
    <>
      <header className={s.container} data-header-desktop>
        <Navigation phones={contacts?.phones || []} />
        <Search categories={categories} />
      </header>
      <HeaderFixed categories={categories} contacts={contacts} />
    </>
  );
};
