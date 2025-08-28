'use client';
import React, { useState, useEffect } from 'react';
import s from './SearchPageSearch.module.scss';
import { TextField } from '@/shared/ui/text-field';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';

export const SearchPageSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get('q') || '');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    // Не выполняем поиск, если значение не изменилось с момента инициализации
    const currentSearchParam = searchParams.get('q') || '';
    if (debouncedSearchValue.trim() === currentSearchParam) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set('page', '1');
    if (debouncedSearchValue.trim().length > 0) {
      params.set('q', debouncedSearchValue.trim());
    } else {
      params.delete('q');
    }

    // Сбрасываем фильтры по цене при изменении поискового запроса
    params.delete('price_from');
    params.delete('price_to');

    router.push(`/search?${params.toString()}`);
  }, [debouncedSearchValue, router, searchParams]);

  return (
    <div className={s.searchContainer}>
      <TextField
        variant="search"
        placeholder="Поиск по товарам"
        className={s.input}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
