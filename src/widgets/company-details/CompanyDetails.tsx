import React from 'react';
import s from './styles.module.scss';
import { ContactsT } from '@/shared/api/design/types';
import { BanknoteIcon, InfoCircleIcon } from '@/shared/assets';

export const CompanyDetails = ({ bank_details, company_info, id }: ContactsT & { id?: string }) => {
  return (
    <div className={s.container} id={id}>
      <h2 className="h2">Реквизиты</h2>

      <div className={s.content}>
        <div className={s.contentBlock}>
          <div className={s.icon}>
            <BanknoteIcon />
          </div>

          <div dangerouslySetInnerHTML={{ __html: bank_details || '' }} className={s.textContent} />
        </div>

        <div className={s.contentBlock}>
          <div className={s.icon}>
            <InfoCircleIcon />
          </div>

          <div dangerouslySetInnerHTML={{ __html: company_info || '' }} className={s.textContent} />
        </div>
      </div>
    </div>
  );
};
