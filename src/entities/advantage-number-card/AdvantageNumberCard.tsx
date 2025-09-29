import React from 'react';
import s from './AdvantageNumberCard.module.scss';
import clsx from 'clsx';
import { AdvantageType } from '@/shared/api/advantages/types';

export const AdvantageNumberCard = ({
  title,
  number,
  description,
}: {
  title: string;
  number: string;
  description: string;
}) => {
  return (
    <div className={s.container}>
      <div className={s.caption}>
        <div className={clsx(s.number, 'h5')}>{number}</div>
        <div className={clsx(s.title, 'h5')} lang="ru">
          {title}
        </div>
      </div>
      <p className={clsx(s.description, 'body_4')}>{description}</p>
    </div>
  );
};
