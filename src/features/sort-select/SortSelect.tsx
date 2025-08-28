'use client';
import { Select } from '@/shared/ui/select';
import React from 'react';
import s from './SortSelect.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

const options = [
  {
    option: 'Популярные',
    value: 'default',
  },
  {
    option: 'Сначала дешевые',
    value: 'price_asc',
  },
  {
    option: 'Сначала дорогие',
    value: 'price_desc',
  },
  {
    option: 'По алфавиту А-Я',
    value: 'name_asc',
  },
  {
    option: 'По алфавиту Я-А',
    value: 'name_desc',
  },
];

export const SortSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');

    if (value !== 'default') {
      const [sort_by, sort_direction] = value.split('_');

      params.set('sort_by', sort_by);
      params.set('sort_direction', sort_direction);
    } else {
      params.delete('sort_by');
      params.delete('sort_direction');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      options={options}
      defaultValue={options[0].value}
      onValueChange={handleChange}
      className={s.select}
    />
  );
};
