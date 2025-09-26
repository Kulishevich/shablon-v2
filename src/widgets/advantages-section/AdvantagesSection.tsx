import React from 'react';
import s from './AdvantagesSection.module.scss';
import { AdvantageCard } from '@/entities/advantage-card';
import { AdvantageType } from '@/shared/api/advantages/types';
import clsx from 'clsx';

export const AdvantagesSection = ({
  advantages,
  isMedium = false,
}: {
  advantages: AdvantageType[] | null;
  isMedium?: boolean;
}) => {
  return (
    <div className={clsx(s.container, { [s.medium]: isMedium })}>
      <h2 className="h2">Наши преимущества</h2>
      <div className={s.advantagesContainer}>
        {advantages?.map((elem, index) => <AdvantageCard {...elem} key={index} />)}
      </div>
    </div>
  );
};
