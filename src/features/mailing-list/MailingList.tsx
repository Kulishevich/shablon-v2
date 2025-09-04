import { MailingListIcon } from '@/shared/assets';
import { Button } from '@/shared/ui/button';
import clsx from 'clsx';
import React from 'react';
import s from './styles.module.scss';

interface IMailingListProps {
  className?: string;
}

export const MailingList = ({ className }: IMailingListProps) => {
  return (
    <div className={clsx(s.mailingList, className)}>
      <MailingListIcon className={s.mailingList__icon} />
      <p className={clsx(s.mailingList__title, 'body_3')}>Подпишитесь на нашу email-рассылку</p>
      <Button className={s.mailingList__btn}>Подписаться</Button>
    </div>
  );
};
