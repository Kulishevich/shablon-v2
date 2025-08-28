import React from 'react';
import s from './CompanyDetails.module.scss';
import { ContactsT } from '@/shared/api/design/types';

export const CompanyDetails = ({ contacts }: { contacts: ContactsT | null }) => {
  return (
    <div className={s.container}>
      <h2 className="h2">Реквизиты компании</h2>
      <div className={s.content}>
        <div className={s.elem}>
          <p className="body_4">{contacts?.company_info}</p>
        </div>
        <div className={s.elem}>
          <p className="body_4">{contacts?.bank_details}</p>
        </div>
      </div>
    </div>
  );
};
