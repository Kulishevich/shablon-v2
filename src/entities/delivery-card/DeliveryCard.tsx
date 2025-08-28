import React from 'react';
import s from './DeliveryCard.module.scss';
import clsx from 'clsx';
import { DeliveryT } from '@/shared/api/delivery-methods/types';

export const DeliveryCard = ({
  name,
  description,
  cost,
  active,
  onClick,
}: DeliveryT & { onClick: () => void; active: boolean }) => {
  return (
    <button type="button" className={clsx(s.container, active && s.active)} onClick={onClick}>
      <span className={s.content}>
        <p className="h5">{name}</p>
        <p className="body_6">{description}</p>
      </span>
      <p className="h5">{!!Number(cost) ? `${Number(cost)} BYN` : 'Бесплатно'}</p>
    </button>
  );
};
