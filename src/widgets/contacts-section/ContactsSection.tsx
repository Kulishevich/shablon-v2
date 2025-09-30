import React from 'react';
import s from './ContactsSection.module.scss';
import { ContactsT } from '@/shared/api/design/types';
import clsx from 'clsx';
import { MailingList } from '@/features/mailing-list';
import { CompanyContactsSection } from '../company-contacts-section';
import { CompanyOffices } from '../company-offices';
import { CompanyDetails } from '../company-details';
import Link from 'next/link';

//todo: заменить на API
const mockNav = [
  { title: 'Адрес и контакты', id: 'contacts' },
  { title: 'Офисы компании', id: 'offices' },
  { title: 'Реквизиты', id: 'details' },
];

export const ContactsSection = ({ contacts }: { contacts: ContactsT }) => {
  return (
    <div className={clsx(s.wrapper)}>
      <h1 className="h1">Контакты</h1>

      <div className={s.container}>
        <div className={s.firstBlock}>
          <div className={s.navList}>
            {mockNav.map((nav) => (
              <Link href={`#${nav.id}`} className={clsx('button', s.navBtn)}>
                {nav.title}
              </Link>
            ))}
          </div>

          <MailingList className="desktop-only" />
        </div>

        <div className={s.secondBlock}>
          <CompanyContactsSection contacts={contacts} id="contacts" />
          <CompanyOffices id="offices" />
          <CompanyDetails {...contacts} id="details" />
        </div>
      </div>
    </div>
  );
};
