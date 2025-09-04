import React from 'react';
import s from './ContactsSection.module.scss';
import { ContactsT } from '@/shared/api/design/types';
import clsx from 'clsx';
import { MailingList } from '@/features/mailing-list';
import { CompanyContactsSection } from '../company-contacts-section';
import { CompanyOffices } from '../company-offices';
import { CompanyDetails } from '../company-details';

//todo: заменить на API
const mockNav = ['Адрес и контакты', 'Офисы компании', 'Реквизиты'];

export const ContactsSection = ({ contacts }: { contacts: ContactsT }) => {
  return (
    <div className={clsx(s.wrapper)}>
      <h1 className="h1">Контакты</h1>

      <div className={s.container}>
        <div className={s.firstBlock}>
          <div className={s.navList}>
            {mockNav.map((nav) => (
              <button className={clsx('button', s.navBtn)}>{nav}</button>
            ))}
          </div>

          <MailingList className="desktop-only" />
        </div>

        <div className={s.secondBlock}>
          <CompanyContactsSection contacts={contacts} />
          <CompanyOffices />
          <CompanyDetails {...contacts} />
        </div>
      </div>
    </div>
  );
};
