import React from 'react';
import s from './AdvantagesSection.module.scss';
import { AdvantageCard } from '@/entities/advantage-card';
import { AdvantageType } from '@/shared/api/advantages/types';

export const AdvantagesSection = ({ advantages }: { advantages: AdvantageType[] | null }) => {
  return (
    <div className={s.container}>
      <h2 className="h2">Наши преимущества</h2>
      <div className={s.advantagesContainer}>
        {advantages?.map((elem, index) => <AdvantageCard {...elem} key={index} />)}
      </div>
    </div>
  );
};
