import React from 'react';
import s from './AdvantageCard.module.scss';
import clsx from 'clsx';
import { AdvantageType } from '@/shared/api/advantages/types';

export const AdvantageCard = ({ title, icon, description }: AdvantageType) => {
  return (
    <div className={s.container}>
      <i className={clsx(icon, s.icon)} />
      <div className={s.caption}>
        <h3 className={clsx(s.title, 'h5')} lang="ru">
          {title}
        </h3>
        <p className={clsx(s.description, 'body_6')}>{description}</p>
      </div>
    </div>
  );
};
